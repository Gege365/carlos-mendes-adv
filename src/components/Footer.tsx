import Image from "next/image";
import { site } from "@/lib/site";

export function Footer() {
  const year = 2026;

  return (
    <footer className="border-t border-[var(--line)] bg-[#08080b]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt={`${site.name} — emblema`}
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
            />
            <div>
              <p className="font-display text-xl">{site.name}</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold">
                Advogado
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            Advocacia humanizada em Direito Trabalhista, Previdenciário e
            Revisional de Imóveis, com transparência e comprometimento.
          </p>
        </div>

        <nav aria-label="Rodapé">
          <p className="mb-3 text-xs uppercase tracking-[0.18em] text-gold">
            Navegação
          </p>
          <ul className="space-y-2 text-sm text-muted">
            {[
              ["#inicio", "Início"],
              ["#atuacao", "Atuação"],
              ["#sobre", "Sobre"],
              ["#como-funciona", "Como funciona"],
              ["#faq", "Dúvidas"],
              ["#contato", "Contato"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="hover:text-foreground">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.18em] text-gold">
            Contato
          </p>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-foreground">
                {site.email}
              </a>
            </li>
            {site.oab.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--line)] px-4 py-5 text-center text-xs text-muted sm:px-6">
        © {year} {site.name} Advogado. Todos os direitos reservados. Site
        desenvolvido por Video One.
      </div>
    </footer>
  );
}
