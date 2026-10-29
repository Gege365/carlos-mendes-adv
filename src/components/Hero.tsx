"use client";

import Image from "next/image";
import { useChat } from "@/components/ChatProvider";
import { site } from "@/lib/site";

export function Hero() {
  const { openChat } = useChat();

  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] overflow-hidden bg-[#070708]"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/carlos-hero.png"
          alt={`Dr. ${site.name}`}
          fill
          priority
          className="object-cover object-[68%_center] opacity-90 sm:object-[75%_center]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070708] via-[#070708]/88 to-[#070708]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-transparent to-[#070708]/55" />
        <div className="hero-grain absolute inset-0 opacity-40 mix-blend-overlay" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-20 pt-28 sm:justify-center sm:px-6 sm:pb-24 lg:px-8">
        <div className="max-w-xl">
          <p className="eyebrow animate-fade-up mb-4">Carlos Mendes · Advogado</p>
          <h1 className="font-display animate-fade-up-delay text-[clamp(2.6rem,7vw,4.6rem)] leading-[0.95] tracking-tight">
            Direitos com{" "}
            <em className="gold-text not-italic">clareza</em>, proximidade e
            estratégia.
          </h1>
          <p className="animate-fade-up-delay-2 mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            Atuação especializada em Direito Trabalhista, Previdenciário e
            Revisional de Imóveis — com atendimento humanizado e total
            transparência em cada etapa.
          </p>

          <div className="animate-fade-up-delay-2 mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={openChat} className="btn-gold rounded-full">
              Iniciar consultoria
            </button>
            <a href="#atuacao" className="btn-ghost rounded-full">
              Conhecer atuação
            </a>
          </div>
        </div>
      </div>

      <a
        href="#consultoria"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-[10px] uppercase tracking-[0.25em] text-muted sm:block"
        aria-label="Rolar para baixo"
      >
        Rolar
      </a>
    </section>
  );
}
