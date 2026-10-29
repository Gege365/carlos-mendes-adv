import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { ChatProvider } from "@/components/ChatProvider";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Carlos Mendes Advogado | Trabalhista, Previdenciário e Imóveis",
  description:
    "Advocacia humanizada em Direito Trabalhista, Previdenciário e Revisional de Imóveis. Atendimento próximo, transparente e estratégico com o Dr. Carlos Mendes.",
  openGraph: {
    title: "Carlos Mendes Advogado",
    description:
      "Proteção legal com transparência em causas trabalhistas, previdenciárias e imobiliárias.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full antialiased">
        <ChatProvider>{children}</ChatProvider>
      </body>
    </html>
  );
}
