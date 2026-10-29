"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export function Sobre() {
  return (
    <section id="sobre" className="section-pad bg-[#0c0c10]">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[var(--line)] bg-[#111]">
              <Image
                src="/images/carlos-hero.png"
                alt={`Dr. ${site.name}`}
                fill
                priority
                quality={100}
                unoptimized
                className="scale-[1.02] object-cover object-[center_12%] contrast-[1.05] saturate-[1.05]"
                sizes="(max-width: 1024px) 100vw, 520px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070708]/70 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-4 left-4 right-4 rounded-2xl border border-[var(--line)] bg-[#121217]/95 p-4 backdrop-blur sm:left-8 sm:right-auto sm:max-w-xs">
              <p className="font-display text-lg text-gold">
                {site.oab.join(" · ")}
              </p>
              <p className="mt-1 text-xs text-muted">Inscrições ativas na OAB</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="eyebrow mb-3">Sobre o advogado</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]">
            Experiência e proximidade para{" "}
            <em className="gold-text not-italic">proteger o que é seu</em>
          </h2>
          <p className="mt-5 text-muted leading-relaxed">
            Meu nome é Carlos Mendes, advogado inscrito na OAB/MG nº 174.882 e
            OAB/TO nº 13.548. Sou Bacharel em Direito pela UNIPAC Uberlândia/MG,
            pós-graduado em Direito Público e possuo MBAs em Compliance,
            Gerenciamento de Riscos e Auditoria, e em Direito Processual Civil e
            Processos de Execução.
          </p>
          <p className="mt-4 text-muted leading-relaxed">
            É comum enfrentar problemas no trabalho ou com o INSS e não saber
            como agir. Estou aqui para transformar essa realidade — com suporte
            humanizado, transparência e linguagem clara, caminhando ao seu lado
            até o melhor resultado possível para o seu caso.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { t: "Humanização", d: "Cada caso com a atenção que merece." },
              { t: "Transparência", d: "Sem juridiquês. Sem promessas vazias." },
              {
                t: "Excelência",
                d: "Estratégia técnica e acompanhamento próximo.",
              },
            ].map((item, i) => (
              <div
                key={item.t}
                className="rounded-2xl border border-[var(--line)] p-4"
              >
                <p className="text-xs text-gold">0{i + 1}</p>
                <h3 className="mt-2 font-display text-xl">{item.t}</h3>
                <p className="mt-1 text-xs text-muted">{item.d}</p>
              </div>
            ))}
          </div>

          <blockquote className="mt-8 border-l-2 border-gold pl-4 font-display text-xl italic text-foreground/90">
            “{site.quote}”
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
