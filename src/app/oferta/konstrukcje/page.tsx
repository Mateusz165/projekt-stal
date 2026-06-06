import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Konstrukcje stalowe na wymiar",
  description: "Indywidualne konstrukcje stalowe na zamówienie. Projekt-Stal Białystok.",
};

export default function ConstructionsPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection>
            <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
              <Link href="/" className="hover:text-zinc-300">Strona główna</Link><span>/</span>
              <Link href="/oferta" className="hover:text-zinc-300">Oferta</Link><span>/</span>
              <span className="text-amber-400">Konstrukcje na wymiar</span>
            </nav>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
              Konstrukcje<br /><span className="text-gradient-gold">na wymiar</span>
            </h1>
            <p className="text-zinc-300 text-xl max-w-xl mb-8">
              Każda realizacja jest inna — tworzymy indywidualne konstrukcje stalowe
              dla firm, deweloperów i klientów prywatnych. Meble metalowe, dekoracje,
              elementy architektury — wszystko ze stali.
            </p>
            <Link href="/kontakt" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-8 py-4 rounded-xl transition-all">Wyślij zapytanie <ArrowRight size={16} /></Link>
          </AnimatedSection>
        </div>
      </section>
      <CTASection />
    </>
  );
}
