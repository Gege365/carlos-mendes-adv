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

type Msg = { role: "bot" | "user"; text: string; time: string };

type Phase = "consent" | "chat" | "done";

const TYPING_MS = 3000;

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function nowTime() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="wa-bubble-in flex items-center gap-1.5 px-3 py-3">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
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
  }, [messages, phase, open, busy]);

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
      await delay(TYPING_MS);
      setMessages((m) => [...m, { role: "bot", text: line, time: nowTime() }]);
    }
    setBusy(false);
  }

  async function startConversation() {
    await pushBot(robertaIntro);
    await pushBot([robertaQuestions[0].message]);
  }

  async function submitAnswer(raw: string) {
    const value = raw.trim();
    const current = robertaQuestions[qIndex];
    if (!current) return;
    if (current.required !== false && !value) return;

    setMessages((m) => [
      ...m,
      { role: "user", text: value || "—", time: nowTime() },
    ]);
    setInput("");
    const nextAnswers = { ...answers, [current.id]: value || "—" };
    setAnswers(nextAnswers);

    const nextIndex = qIndex + 1;
    if (nextIndex < robertaQuestions.length) {
      setQIndex(nextIndex);
      await pushBot([robertaQuestions[nextIndex].message]);
      return;
    }

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
      // Sheets depois
    }

    setPhase("done");
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    void submitAnswer(input);
  }

  function resetAndClose() {
    closeChat();
    window.setTimeout(() => {
      setPhase("consent");
      setMessages([]);
      setQIndex(0);
      setAnswers({});
      setInput("");
      setBusy(false);
      startedRef.current = false;
    }, 250);
  }

  const current = robertaQuestions[qIndex];
  const showOptions =
    phase === "chat" && !busy && current?.type === "options" && current.options;

  return (
    <>
      {bubble && !open && (
        <div className="fixed bottom-[5.6rem] right-4 z-40 max-w-[200px] sm:right-6">
          <div className="relative rounded-2xl border border-[var(--line)] bg-[#121216] px-2.5 py-2 shadow-2xl">
            <button
              type="button"
              aria-label="Fechar mensagem"
              onClick={() => setBubble(false)}
              className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#1c1c22] text-xs text-muted hover:text-foreground"
            >
              ×
            </button>
            <p className="pr-2 text-[10px] leading-snug text-foreground/90">
              Olá! Eu sou a Roberta, secretária do Dr Carlos Mendes. Irei te
              ajudar por aqui hoje.
            </p>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={openChat}
        className="fixed bottom-5 right-4 z-40 flex items-center gap-2.5 !rounded-full border border-[var(--line)] bg-[#121216]/95 py-1.5 pl-1.5 pr-4 shadow-2xl backdrop-blur transition hover:-translate-y-0.5 sm:right-6"
        aria-label="Falar com a Roberta"
      >
        <span className="relative h-11 w-11 overflow-hidden rounded-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/roberta-avatar.jpg"
            alt="Roberta"
            className="h-full w-full object-cover object-[center_18%]"
          />
          <span className="online-dot absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#121216] bg-emerald-400" />
        </span>
        <span className="text-left">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-muted">
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
          <div className="relative z-10 flex h-[min(94vh,740px)] w-full max-w-md flex-col overflow-hidden rounded-t-3xl border border-[var(--line)] bg-[#0b141a] shadow-2xl sm:h-[min(88vh,700px)] sm:rounded-3xl">
            <header className="flex items-center gap-3 bg-[#1f2c34] px-3 py-3">
              <button
                type="button"
                onClick={resetAndClose}
                className="px-1 text-lg text-[#8696a0] hover:text-white"
                aria-label="Fechar atendimento"
              >
                ←
              </button>
              <span className="relative h-10 w-10 overflow-hidden rounded-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/roberta-avatar.jpg"
                  alt="Roberta"
                  className="h-full w-full object-cover object-[center_18%]"
                />
                <span className="online-dot absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#1f2c34] bg-emerald-400" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold leading-tight text-[#e9edef]">Roberta</p>
                <p className="text-xs text-[#8696a0]">
                  {busy ? "digitando…" : "Secretária · online"}
                </p>
              </div>
            </header>

            {phase === "consent" && (
              <div className="flex flex-1 flex-col justify-center gap-5 bg-[#0b141a] px-6 py-8">
                <p className="eyebrow">Privacidade</p>
                <h3 className="font-display text-3xl leading-tight text-[#e9edef]">
                  Sua privacidade em primeiro lugar
                </h3>
                <p className="text-sm leading-relaxed text-[#8696a0]">
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
                <div className="chat-scroll wa-surface flex-1 space-y-2 overflow-y-auto px-3 py-4">
                  <p className="mb-2 text-center text-[10px] uppercase tracking-wider text-[#8696a0]">
                    Hoje
                  </p>
                  {messages.map((msg, i) => (
                    <div
                      key={`${msg.role}-${i}`}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] px-3 py-2 text-sm leading-relaxed shadow-sm ${
                          msg.role === "user" ? "wa-bubble-out" : "wa-bubble-in"
                        }`}
                      >
                        {msg.text}
                        <span className="mt-1 block text-right text-[10px] opacity-60">
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  ))}
                  {busy && <TypingBubble />}
                  <div ref={bottomRef} />
                </div>

                {phase === "done" ? (
                  <div className="border-t border-white/5 bg-[#1f2c34] p-4">
                    <a
                      href={whatsappLink(
                        `Olá! Concluí o atendimento com a Roberta no site e gostaria de falar com o Dr. Carlos Mendes.\n\nNome: ${answers.nome || "-"}\nÁrea: ${answers.area || "-"}\nWhatsApp informado: ${answers.whatsapp || "-"}`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp w-full"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Conversar no WhatsApp
                    </a>
                  </div>
                ) : (
                  <div className="border-t border-white/5 bg-[#1f2c34] p-3">
                    {showOptions ? (
                      <div className="mb-3 flex flex-wrap gap-2">
                        {current.options!.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            disabled={busy}
                            onClick={() => void submitAnswer(opt)}
                            className="rounded-full border border-white/10 bg-[#2a3942] px-3 py-2 text-left text-sm text-[#e9edef] transition hover:border-gold hover:bg-[rgba(197,160,89,0.15)]"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    ) : null}
                    <form onSubmit={onSubmit} className="flex items-end gap-2">
                      {current?.type === "textarea" ? (
                        <textarea
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          disabled={busy}
                          rows={2}
                          placeholder={current.placeholder || "Mensagem"}
                          className="min-h-[44px] flex-1 resize-none rounded-2xl border-0 bg-[#2a3942] px-4 py-2.5 text-sm text-[#e9edef] outline-none placeholder:text-[#8696a0]"
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
                              : current?.placeholder || "Mensagem"
                          }
                          className="h-11 flex-1 rounded-full border-0 bg-[#2a3942] px-4 text-sm text-[#e9edef] outline-none placeholder:text-[#8696a0] disabled:opacity-60"
                        />
                      )}
                      <button
                        type="submit"
                        disabled={
                          busy || (!input.trim() && current?.required !== false)
                        }
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#c5a059] text-[#12100a] disabled:opacity-50"
                        aria-label="Enviar resposta"
                      >
                        ↑
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
