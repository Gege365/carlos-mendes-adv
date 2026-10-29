import Image from "next/image";
import { site, whatsappLink } from "@/lib/site";

function IconWhatsApp() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.6l.4-3H14V9z" />
    </svg>
  );
}

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
          <div className="mt-5 flex items-center gap-3">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-[#25d366] transition hover:border-[#25d366] hover:bg-[#25d366]/10"
              aria-label="WhatsApp"
            >
              <IconWhatsApp />
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-gold transition hover:bg-gold/10"
              aria-label="Instagram"
            >
              <IconInstagram />
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-gold transition hover:bg-gold/10"
              aria-label="Facebook"
            >
              <IconFacebook />
            </a>
          </div>
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
          <ul className="space-y-2.5 text-sm text-muted">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#25d366]"
              >
                <IconWhatsApp />
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-gold"
              >
                <IconInstagram />
                Instagram
              </a>
            </li>
            <li>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-gold"
              >
                <IconFacebook />
                Facebook
              </a>
            </li>
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
