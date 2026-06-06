import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Tarasy stalowe i zadaszenia",
  description: "Tarasy stalowe, pergole i zadaszenia szklane. Projekt-Stal Białystok.",
};

const types = [
  { title: "Tarasy stalowe", image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80", desc: "Tarasy na konstrukcji stalowej — trwałe, odporne na warunki atmosferyczne." },
  { title: "Pergole i zadaszenia", image: "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=600&q=80", desc: "Pergole stalowe z dachem płaskim lub łukowym, z wypełnieniem szklanym lub poliwęglanowym." },
  { title: "Zadaszenia szklane", image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&q=80", desc: "Eleganckie zadaszenia ze szkłem hartowanym — przepuszczają światło i chronią przed deszczem." },
  { title: "Wiaty i carporty", image: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=600&q=80", desc: "Wiaty na samochody i narzędzia — ekonomiczne i trwałe rozwiązania stalowe." },
];

export default function TarasyPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection>
            <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
              <Link href="/" className="hover:text-zinc-300">Strona główna</Link><span>/</span>
              <Link href="/oferta" className="hover:text-zinc-300">Oferta</Link><span>/</span>
              <span className="text-amber-400">Tarasy i zadaszenia</span>
            </nav>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
              Tarasy<br /><span className="text-gradient-gold">i zadaszenia</span>
            </h1>
            <p className="text-zinc-300 text-xl max-w-xl mb-8">Stalowe tarasy, pergole i zadaszenia szklane — nowoczesne i trwałe.</p>
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
                    <p className="text-zinc-400 text-sm">{t.desc}</p>
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
