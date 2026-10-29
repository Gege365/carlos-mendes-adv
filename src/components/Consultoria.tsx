"use client";

import { useChat } from "@/components/ChatProvider";

export function Consultoria() {
  const { openChat } = useChat();

  return (
    <section id="consultoria" className="section-pad border-y border-[var(--line)] bg-[#0c0c10]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
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
              "Continue com o especialista no WhatsApp ou e-mail",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 bg-gold" />
                {item}
              </li>
            ))}
          </ul>
          <button type="button" onClick={openChat} className="btn-gold mt-8">
            Iniciar consultoria
          </button>
        </div>

        <div className="relative gold-border bg-[#121217] p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold">
              Sigiloso e seguro
            </span>
            <span className="flex items-center gap-2 text-xs text-muted">
              <span className="online-dot h-2 w-2 rounded-full bg-emerald-400" />
              online agora
            </span>
          </div>
          <div className="space-y-3">
            <div className="max-w-[90%] border border-[var(--line)] bg-[#18181f] px-4 py-3 text-sm leading-relaxed">
              Olá! Eu sou a Roberta. Em poucos minutos, reúno o essencial do seu
              caso para o Dr. Carlos analisar.
            </div>
            <div className="ml-auto max-w-[75%] bg-[linear-gradient(135deg,#a8843d,#c5a059)] px-4 py-3 text-sm text-[#12100a]">
              Preciso de orientação sobre meus direitos.
            </div>
            <div className="max-w-[90%] border border-[var(--line)] bg-[#18181f] px-4 py-3 text-sm leading-relaxed">
              Perfeito. Vamos começar — como posso chamá-lo(a)?
            </div>
          </div>
          <div className="mt-8 flex items-center gap-3 border-t border-[var(--line)] pt-5">
            <span className="flex h-12 w-12 items-center justify-center bg-[#1c1c22] font-display text-xl text-gold">
              R
            </span>
            <div>
              <p className="font-semibold">Roberta</p>
              <p className="text-xs text-muted">Secretária · online agora</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
