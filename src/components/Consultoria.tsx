"use client";

import { useEffect, useState } from "react";
import { useChat } from "@/components/ChatProvider";
import { Reveal } from "@/components/Reveal";

const demoMessages = [
  {
    role: "bot" as const,
    text: "Olá! Eu sou a Roberta. Em poucos minutos, reúno o essencial do seu caso para o Dr. Carlos analisar.",
  },
  {
    role: "user" as const,
    text: "Preciso de orientação sobre meus direitos.",
  },
  {
    role: "bot" as const,
    text: "Perfeito. Vamos começar — como posso chamá-lo(a)?",
  },
];

export function Consultoria() {
  const { openChat } = useChat();
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timers: number[] = [];

    const run = async () => {
      setVisibleCount(0);
      setTyping(false);

      for (let i = 0; i < demoMessages.length; i++) {
        if (cancelled) return;
        if (demoMessages[i].role === "bot") {
          setTyping(true);
          await new Promise((r) => {
            timers.push(window.setTimeout(r, 1200));
          });
          if (cancelled) return;
          setTyping(false);
        }
        setVisibleCount(i + 1);
        await new Promise((r) => {
          timers.push(window.setTimeout(r, 1800));
        });
      }

      // loop
      if (!cancelled) {
        timers.push(
          window.setTimeout(() => {
            if (!cancelled) void run();
          }, 2200),
        );
      }
    };

    void run();
    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <section id="consultoria" className="section-pad border-y border-[var(--line)] bg-[#0c0c10]">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
        <Reveal className="lg:col-start-1">
          <p className="eyebrow mb-3">Atendimento inicial</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]">
            Consultoria inicial{" "}
            <em className="gold-text not-italic">para o seu caso</em>
          </h2>
          <p className="mt-5 text-muted leading-relaxed">
            Problemas no trabalho, no INSS ou com o seu imóvel? Converse com a
            Roberta, nossa secretária virtual, conte o que está acontecendo e
            receba o encaminhamento para o Dr. Carlos Mendes.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              "Atendimento sigiloso",
              "Rápido e objetivo",
              "Continue com o especialista no WhatsApp",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="dot-gold" />
                {item}
              </li>
            ))}
          </ul>
          <button type="button" onClick={openChat} className="btn-gold mt-8 rounded-full">
            Iniciar consultoria
          </button>
        </Reveal>

        <Reveal delay={120} className="flex justify-center lg:col-start-2">
          <div className="phone-frame relative w-[min(100%,290px)] overflow-hidden">
            <div className="relative flex items-center justify-center bg-[#0a0a0c] pt-2">
              <div className="phone-notch" />
            </div>

            {/* WhatsApp header */}
            <div className="flex items-center gap-3 bg-[#1f2c34] px-3 py-2.5">
              <div className="relative h-9 w-9 overflow-hidden rounded-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/roberta-avatar.jpg"
                  alt="Roberta"
                  className="h-full w-full object-cover object-[center_18%]"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[#e9edef]">Roberta</p>
                <p className="text-[11px] text-[#8696a0]">
                  {typing ? "digitando…" : "online"}
                </p>
              </div>
              <span className="online-dot h-2 w-2 rounded-full bg-emerald-400" />
            </div>

            {/* Chat area */}
            <div className="wa-surface flex h-[420px] flex-col gap-2 overflow-hidden px-3 py-4">
              <p className="mb-1 text-center text-[10px] uppercase tracking-wider text-[#8696a0]">
                Hoje
              </p>
              {demoMessages.slice(0, visibleCount).map((msg, i) => (
                <div
                  key={`${msg.role}-${i}`}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] px-3 py-2 text-[13px] leading-relaxed shadow-sm ${
                      msg.role === "user" ? "wa-bubble-out" : "wa-bubble-in"
                    }`}
                  >
                    {msg.text}
                    <span className="mt-1 block text-right text-[10px] opacity-60">
                      {msg.role === "user" ? "14:0" + (i + 2) : "14:0" + (i + 1)}
                    </span>
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="wa-bubble-in flex items-center gap-1.5 px-3 py-3">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              )}
            </div>

            {/* Input bar */}
            <div className="flex items-center gap-2 bg-[#1f2c34] px-3 py-2.5">
              <div className="flex-1 rounded-full bg-[#2a3942] px-4 py-2 text-xs text-[#8696a0]">
                Mensagem
              </div>
              <button
                type="button"
                onClick={openChat}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c5a059] text-xs font-bold text-[#12100a]"
                aria-label="Iniciar conversa"
              >
                →
              </button>
            </div>
            <div className="h-3 bg-[#0a0a0c]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
