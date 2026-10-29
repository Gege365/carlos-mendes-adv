import { Areas } from "@/components/Areas";
import { CTA } from "@/components/CTA";
import { ComoFunciona } from "@/components/ComoFunciona";
import { Consultoria } from "@/components/Consultoria";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { RobertaChat } from "@/components/RobertaChat";
import { Sobre } from "@/components/Sobre";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Consultoria />
        <Marquee />
        <Areas />
        <Sobre />
        <ComoFunciona />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <RobertaChat />
    </>
  );
}
