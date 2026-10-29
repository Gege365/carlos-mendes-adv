"use client";

import { Reveal } from "@/components/Reveal";
import { areas } from "@/lib/site";

export function Areas() {
  return (
    <section id="atuacao" className="section-pad">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <p className="eyebrow mb-3">Áreas de atuação</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]">
            Defesa especializada para{" "}
            <em className="gold-text not-italic">cada momento</em> da sua vida
          </h2>
          <p className="mt-5 text-muted leading-relaxed">
            Do dia a dia no trabalho às questões do INSS e do seu patrimônio,
            atuação com técnica, sensibilidade e atenção a cada detalhe.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {areas.map((area, index) => (
            <Reveal key={area.id} delay={index * 100}>
              <article className="group h-full rounded-2xl border border-[var(--line)] bg-[#0f0f13] p-6 transition hover:border-gold/50 sm:p-8">
                <span className="font-display text-4xl text-gold/40 transition group-hover:text-gold">
                  0{index + 1}
                </span>
                <h3 className="mt-4 font-display text-2xl">{area.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {area.description}
                </p>
                <ul className="mt-6 space-y-2.5 border-t border-[var(--line)] pt-5">
                  {area.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm text-foreground/90">
                      <span className="dot-gold mt-1.5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
