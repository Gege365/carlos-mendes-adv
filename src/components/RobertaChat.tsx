"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useChat } from "@/components/ChatProvider";
import {
  robertaClosing,
  robertaIntro,
  robertaQuestions,
  type LeadPayload,
} from "@/lib/roberta";
import { site, whatsappLink } from "@/lib/site";

type Msg = { role: "bot" | "user"; text: string };

type Phase = "consent" | "chat" | "done";

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export function RobertaChat() {
  const { open, closeChat, openChat } = useChat();
  const [phase, setPhase] = useState<Phase>("consent");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [bubble, setBubble] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, phase, open]);

  useEffect(() => {
    if (!open) return;
    if (phase !== "chat") return;
    if (startedRef.current) return;
    startedRef.current = true;
    void startConversation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, phase]);

  async function pushBot(lines: string[]) {
    setBusy(true);
    for (const line of lines) {
      await delay(450);
      setMessages((m) => [...m, { role: "bot", text: line }]);
    }
    setBusy(false);
  }

  async function startConversation() {
    await pushBot(robertaIntro);
    await delay(300);
    await pushBot([robertaQuestions[0].message]);
  }

  async function submitAnswer(raw: string) {
    const value = raw.trim();
    const current = robertaQuestions[qIndex];
    if (!current) return;
    if (current.required !== false && !value) return;

    setMessages((m) => [...m, { role: "user", text: value || "—" }]);
    setInput("");
    const nextAnswers = { ...answers, [current.id]: value || "—" };
    setAnswers(nextAnswers);

    const nextIndex = qIndex + 1;
    if (nextIndex < robertaQuestions.length) {
      setQIndex(nextIndex);
      setBusy(true);
      await delay(500);
      await pushBot([robertaQuestions[nextIndex].message]);
      return;
    }

    setBusy(true);
    await delay(500);
    const nome = nextAnswers.nome?.split(" ")[0] || "";
    await pushBot(robertaClosing(nome));

    const payload: LeadPayload = {
      answers: nextAnswers,
      createdAt: new Date().toISOString(),
      source: "site-roberta",
    };

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // Sheets virá depois; falha silenciosa na demo
    }

    setPhase("done");
    setBusy(false);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    void submitAnswer(input);
  }

  function resetAndClose() {
    closeChat();
  }

  const current = robertaQuestions[qIndex];
  const showOptions =
    phase === "chat" && !busy && current?.type === "options" && current.options;

  return (
    <>
      {bubble && !open && (
        <div className="fixed bottom-28 right-4 z-40 max-w-[260px] sm:right-6">
          <div className="relative gold-border bg-[#121216] px-4 py-3 shadow-2xl">
            <button
              type="button"
              aria-label="Fechar mensagem"
              onClick={() => setBubble(false)}
              className="absolute right-2 top-2 text-muted/70 hover:text-foreground"
            >
              ×
            </button>
            <p className="pr-4 text-sm leading-relaxed text-foreground/90">
              Olá, meu nome é Roberta, secretária do Dr. Carlos Mendes. Vou te
              ajudar no que precisar.
            </p>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={openChat}
        className="fixed bottom-5 right-4 z-40 flex items-center gap-3 gold-border bg-[#121216] py-2 pl-2 pr-4 shadow-2xl transition hover:-translate-y-0.5 sm:right-6"
        aria-label="Falar com a Roberta"
      >
        <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden bg-[#1c1c22]">
          <span className="font-display text-xl text-gold">R</span>
          <span className="online-dot absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </span>
        <span className="text-left">
          <span className="block text-[10px] uppercase tracking-[0.18em] text-muted">
            Atendimento
          </span>
          <span className="block text-sm font-semibold text-foreground">
            Roberta
          </span>
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Atendimento inicial com a Roberta"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Fechar fundo"
            onClick={resetAndClose}
          />
          <div className="relative z-10 flex h-[min(92vh,720px)] w-full max-w-lg flex-col overflow-hidden border border-[var(--line)] bg-[#0d0d10] shadow-2xl sm:h-[min(88vh,700px)]">
            <header className="flex items-center gap-3 border-b border-[var(--line)] px-4 py-3">
              <span className="relative flex h-11 w-11 items-center justify-center bg-[#1c1c22]">
                <span className="font-display text-lg text-gold">R</span>
                <span className="online-dot absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold leading-tight">Roberta</p>
                <p className="text-xs text-muted">Secretária · online</p>
              </div>
              <button
                type="button"
                onClick={resetAndClose}
                className="px-2 py-1 text-sm text-muted hover:text-foreground"
                aria-label="Fechar atendimento"
              >
                Fechar
              </button>
            </header>

            {phase === "consent" && (
              <div className="flex flex-1 flex-col justify-center gap-5 px-6 py-8">
                <p className="eyebrow">Privacidade</p>
                <h3 className="font-display text-3xl leading-tight">
                  Sua privacidade em primeiro lugar
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  Para o seu atendimento, vamos coletar o seu nome, WhatsApp e
                  algumas informações sobre o seu caso. Esses dados serão
                  utilizados apenas por {site.name} Advogado para entrar em
                  contato e analisar a sua situação, com total sigilo e em
                  conformidade com a LGPD.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    className="btn-gold"
                    onClick={() => setPhase("chat")}
                  >
                    Concordo e continuar
                  </button>
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={resetAndClose}
                  >
                    Agora não
                  </button>
                </div>
              </div>
            )}

            {phase !== "consent" && (
              <>
                <div className="chat-scroll flex-1 space-y-3 overflow-y-auto px-4 py-5">
                  {messages.map((msg, i) => (
                    <div
                      key={`${msg.role}-${i}`}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-[linear-gradient(135deg,#a8843d,#c5a059)] text-[#12100a]"
                            : "border border-[var(--line)] bg-[#15151a] text-foreground"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {busy && (
                    <div className="text-xs tracking-wide text-muted">
                      Roberta está digitando…
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>

                {phase === "done" ? (
                  <div className="border-t border-[var(--line)] p-4">
                    <a
                      href={whatsappLink(
                        `Olá! Concluí o atendimento com a Roberta no site e gostaria de falar com o Dr. Carlos Mendes.\n\nNome: ${answers.nome || "-"}\nÁrea: ${answers.area || "-"}\nWhatsApp: ${answers.whatsapp || "-"}`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold w-full"
                    >
                      Continuar no {site.whatsapp ? "WhatsApp" : "e-mail"}
                    </a>
                  </div>
                ) : (
                  <div className="border-t border-[var(--line)] p-3">
                    {showOptions ? (
                      <div className="mb-3 flex flex-wrap gap-2">
                        {current.options!.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            disabled={busy}
                            onClick={() => void submitAnswer(opt)}
                            className="border border-[var(--line)] bg-[#15151a] px-3 py-2 text-left text-sm transition hover:border-gold hover:bg-[rgba(197,160,89,0.08)]"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    ) : null}
                    <form onSubmit={onSubmit} className="flex gap-2">
                      {current?.type === "textarea" ? (
                        <textarea
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          disabled={busy}
                          rows={2}
                          placeholder={current.placeholder || "Sua resposta"}
                          className="min-h-[44px] flex-1 resize-none border border-[var(--line)] bg-[#15151a] px-3 py-2 text-sm outline-none placeholder:text-muted focus:border-gold"
                        />
                      ) : (
                        <input
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          disabled={busy || !!showOptions}
                          type={current?.type === "tel" ? "tel" : "text"}
                          placeholder={
                            showOptions
                              ? "Ou escolha uma opção acima"
                              : current?.placeholder || "Sua resposta"
                          }
                          className="h-11 flex-1 border border-[var(--line)] bg-[#15151a] px-3 text-sm outline-none placeholder:text-muted focus:border-gold disabled:opacity-60"
                        />
                      )}
                      <button
                        type="submit"
                        disabled={busy || (!input.trim() && current?.required !== false)}
                        className="btn-gold h-11 shrink-0 px-4 disabled:opacity-50"
                        aria-label="Enviar resposta"
                      >
                        Enviar
                      </button>
                    </form>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
