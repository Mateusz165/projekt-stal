import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Ogrodzenia metalowe nowoczesne",
  description: "Nowoczesne ogrodzenia metalowe – panelowe, palisadowe i na zamówienie. Projekt-Stal Białystok.",
};

const types = [
  { title: "Ogrodzenia nowoczesne", image: "/images/ogrodzenie-dobrzyniewo1.jpg", features: ["Minimalistyczny design", "Profile pionowe / poziome", "Kolor RAL"], desc: "Nowoczesne ogrodzenia z profili stalowych — minimalistyczne, trwałe i estetyczne." },
  { title: "Ogrodzenia panelowe", image: "/images/ogrodzenie-dobrzyniewo2.jpg", features: ["Panel ocynkowany", "Szybki montaż", "Ekonomiczne"], desc: "Popularne ogrodzenia panelowe — tanie, trwałe i łatwe w montażu." },
  { title: "Ogrodzenia palisadowe", image: "/images/brama-nowodworce1.jpg", features: ["Pionowe sztachety", "Ostro zakończone", "Efekt designerski"], desc: "Palisadowe ogrodzenia stalowe — eleganckie i bezpieczne." },
  { title: "Ogrodzenia na zamówienie", image: "/images/brama-nowodworce2.jpg", features: ["Indywidualny projekt", "Dowolne wzory", "Laser / CNC"], desc: "Unikalne ogrodzenia z wyciętymi wzorami, laserowo lub CNC, na indywidualne zamówienie." },
];

export default function FencesPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection>
            <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
              <Link href="/" className="hover:text-zinc-300">Strona główna</Link><span>/</span>
              <Link href="/oferta" className="hover:text-zinc-300">Oferta</Link><span>/</span>
              <span className="text-amber-400">Ogrodzenia</span>
            </nav>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
              Ogrodzenia<br /><span className="text-gradient-gold">metalowe</span>
            </h1>
            <p className="text-zinc-300 text-xl max-w-xl leading-relaxed mb-8">Nowoczesne ogrodzenia stalowe dopasowane do każdej posesji i budżetu.</p>
            <Link href="/kontakt" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-8 py-4 rounded-xl transition-all duration-200">Zamów wycenę <ArrowRight size={16} /></Link>
          </AnimatedSection>
        </div>
      </section>
      <section className="py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {types.map((t) => (
              <StaggerItem key={t.title}>
                <div className="bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-2xl overflow-hidden group hover-lift transition-all duration-300">
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
