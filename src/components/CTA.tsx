"use client";

import { useChat } from "@/components/ChatProvider";
import { site, whatsappLink } from "@/lib/site";

export function CTA() {
  const { openChat } = useChat();

  return (
    <section id="contato" className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(197,160,89,0.14),transparent_55%)]" />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="eyebrow mb-3">Atendimento inicial</p>
        <h2 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05]">
          Proteja seus direitos{" "}
          <em className="gold-text not-italic">hoje mesmo</em>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-muted leading-relaxed">
          Fale com a Roberta ou entre em contato diretamente. Conte o seu caso
          com sigilo, clareza e atenção.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button type="button" onClick={openChat} className="btn-gold">
            Iniciar consultoria
          </button>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            {site.whatsapp ? "Falar no WhatsApp" : "Enviar e-mail"}
          </a>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
          <a href={`mailto:${site.email}`} className="hover:text-gold">
            {site.email}
          </a>
          <span className="hidden text-[var(--line)] sm:inline">|</span>
          <span>{site.oab.join(" · ")}</span>
        </div>
      </div>
    </section>
  );
}
