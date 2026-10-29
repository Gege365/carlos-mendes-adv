import { steps } from "@/lib/site";

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="section-pad">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="eyebrow mb-3">Como funciona</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]">
            Um caminho <em className="gold-text not-italic">claro</em> do
            primeiro contato à conclusão
          </h2>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => (
            <li
              key={step.n}
              className="relative border border-[var(--line)] bg-[#0f0f13] p-6"
            >
              <span className="font-display text-4xl text-gold">{step.n}</span>
              <h3 className="mt-4 font-display text-2xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
