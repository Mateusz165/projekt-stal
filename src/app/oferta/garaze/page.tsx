import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Garaże stalowe",
  description: "Garaże stalowe wolnostojące na zamówienie. Projekt-Stal Białystok.",
};

export default function GaragesPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection>
            <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
              <Link href="/" className="hover:text-zinc-300">Strona główna</Link><span>/</span>
              <Link href="/oferta" className="hover:text-zinc-300">Oferta</Link><span>/</span>
              <span className="text-amber-400">Garaże stalowe</span>
            </nav>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
              Garaże<br /><span className="text-gradient-gold">stalowe</span>
            </h1>
            <p className="text-zinc-300 text-xl max-w-xl mb-8">
              Garaże stalowe wolnostojące — trwałe, ekonomiczne i wykonane na wymiar.
              Dostępne w standardowych rozmiarach lub na indywidualne zamówienie.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {["Standard 3×5m", "Podwójny 6×5m", "Na zamówienie"].map((s) => (
                <div key={s} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
                  <div className="text-amber-400 font-bold">{s}</div>
                </div>
              ))}
            </div>
            <Link href="/kontakt" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-8 py-4 rounded-xl transition-all">Zamów wycenę <ArrowRight size={16} /></Link>
          </AnimatedSection>
        </div>
      </section>
      <CTASection />
    </>
  );
}
