import { faqs } from "@/lib/site";

export function FAQ() {
  return (
    <section id="faq" className="section-pad bg-[#0c0c10]">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <p className="eyebrow mb-3">Dúvidas frequentes</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]">
            Respostas <em className="gold-text not-italic">claras</em> para as
            perguntas mais comuns
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((item, index) => (
            <details
              key={item.q}
              className="faq-item group border border-[var(--line)] bg-[#101015] open:border-gold/40"
              open={index === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-medium marker:content-none">
                <span>{item.q}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0 text-gold transition"
                  aria-hidden
                >
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </summary>
              <p className="border-t border-[var(--line)] px-5 py-4 text-sm leading-relaxed text-muted">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
