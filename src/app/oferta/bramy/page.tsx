import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Bramy garażowe i wjazdowe",
  description: "Bramy garażowe, przesuwne i skrzydłowe z automatyką. Projekt-Stal Białystok.",
};

const types = [
  { title: "Bramy garażowe", image: "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=600&q=80", features: ["Segmentowe lub uchylne", "Napęd automatyczny", "Izolacja termiczna"], desc: "Nowoczesne bramy garażowe segmentowe i uchylne — z napędem i bez." },
  { title: "Bramy przesuwne", image: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=600&q=80", features: ["Otwieranie boczne", "Automatyka 24V", "Karta / pilot"], desc: "Bramy przesuwne z napędem automatycznym — ekonomiczne i trwałe." },
  { title: "Bramy skrzydłowe", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", features: ["2 skrzydła", "Z furtkę lub bez", "Klasyczne lub modern"], desc: "Tradycyjne bramy skrzydłowe w nowoczesnym wydaniu — klasyka i elegancja." },
  { title: "Automatyka do bram", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80", features: ["Sterowanie pilotem", "App na telefon", "Czujniki bezpieczeństwa"], desc: "Automatyzacja istniejących bram — montaż siłowników i systemów sterowania." },
];

export default function GatesPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection>
            <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
              <Link href="/" className="hover:text-zinc-300">Strona główna</Link><span>/</span>
              <Link href="/oferta" className="hover:text-zinc-300">Oferta</Link><span>/</span>
              <span className="text-amber-400">Bramy</span>
            </nav>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
              Bramy<br /><span className="text-gradient-gold">garażowe i wjazdowe</span>
            </h1>
            <p className="text-zinc-300 text-xl max-w-xl leading-relaxed mb-8">Bramy z automatyką lub ręczne — garażowe, przesuwne i skrzydłowe na zamówienie.</p>
            <Link href="/kontakt" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-8 py-4 rounded-xl transition-all">Zamów wycenę <ArrowRight size={16} /></Link>
          </AnimatedSection>
        </div>
      </section>
      <section className="py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {types.map((t) => (
              <StaggerItem key={t.title}>
                <div className="bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-2xl overflow-hidden group hover-lift">
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${t.image}')` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-white font-bold text-xl mb-2" style={{ fontFamily: "var(--font-outfit)" }}>{t.title}</h3>
                    <p className="text-zinc-400 text-sm mb-4">{t.desc}</p>
                    <div className="space-y-1.5">{t.features.map((f) => <div key={f} className="flex items-center gap-2"><CheckCircle size={13} className="text-amber-400 shrink-0" /><span className="text-zinc-300 text-sm">{f}</span></div>)}</div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
      <CTASection />
    </>
  );
}
