"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useChat } from "@/components/ChatProvider";
import { site } from "@/lib/site";

const links = [
  { href: "#atuacao", label: "Atuação" },
  { href: "#sobre", label: "Sobre" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#faq", label: "Dúvidas" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const { openChat } = useChat();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Fecha ao voltar para desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled || menuOpen ? "bg-[#070708]/95 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a
          href="#inicio"
          className="flex items-center gap-3"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/images/logo.png"
            alt={`${site.name} — emblema`}
            width={48}
            height={48}
            className="h-11 w-11 object-contain"
            priority
          />
          <span className="hidden sm:block">
            <span className="block font-display text-xl leading-none tracking-wide">
              {site.name}
            </span>
            <span className="mt-0.5 block text-[10px] uppercase tracking-[0.2em] text-gold">
              Advogado
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openChat}
            className="btn-gold hidden rounded-full text-sm sm:inline-flex"
          >
            Consultoria inicial
          </button>
          <button
            type="button"
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] lg:hidden"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className={`absolute h-0.5 w-4 rounded-full bg-foreground transition-all duration-300 ${
                menuOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute h-0.5 w-4 rounded-full bg-foreground transition-all duration-300 ${
                menuOpen ? "scale-x-0 opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute h-0.5 w-4 rounded-full bg-foreground transition-all duration-300 ${
                menuOpen ? "translate-y-0 -rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Overlay + painel: só existem quando aberto */}
      {menuOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-30 bg-black/55 lg:hidden"
            aria-label="Fechar menu"
            onClick={() => setMenuOpen(false)}
          />
          <div className="mobile-panel absolute inset-x-0 top-full z-40 border-t border-[var(--line)] bg-[#0d0d10] px-4 pb-5 pt-2 shadow-2xl lg:hidden">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {links.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="mobile-link rounded-full px-3 py-3 text-sm text-muted transition hover:bg-white/5 hover:text-foreground"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  {l.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openChat();
                }}
                className="btn-gold mt-2 w-full rounded-full text-sm"
              >
                Consultoria inicial
              </button>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
