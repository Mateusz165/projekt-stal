import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Schody stalowe i loftowe",
  description:
    "Schody stalowe, loftowe, wspornikowe, dywanowe i zabiegowe na zamówienie. Projekt-Stal Białystok – projektowanie, produkcja i montaż.",
};

const types = [
  {
    title: "Schody loftowe",
    image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=600&q=80",
    desc: "Industrialny charakter połączony z nowoczesnym designem. Stal surowa lub malowana, stopnie z drewna lub blachy.",
    features: ["Stal + drewno dębowe", "Stal + blacha ryflowana", "Czarny mat lub kolor RAL"],
  },
  {
    title: "Schody wspornikowe",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6d8fbe5e?w=600&q=80",
    desc: "Minimalistyczne schody bez widocznej konstrukcji — stopnie zamocowane bezpośrednio w ścianie.",
    features: ["Efekt unoszenia", "Stal + drewno lub beton", "Idealne do wnętrz premium"],
  },
  {
    title: "Schody dywanowe",
    image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80",
    desc: "Eleganckie schody z grubą blachą giętą — minimalistyczna forma, maksymalna trwałość.",
    features: ["Blacha stalowa 6-10mm", "Lakierowanie proszkowe", "Dowolna konfiguracja"],
  },
  {
    title: "Schody zabiegowe",
    image: "https://images.unsplash.com/photo-1604014236011-1bfcae40c2c0?w=600&q=80",
    desc: "Spiralne lub zabiegowe — idealne gdy liczy się przestrzeń. Estetyczne i funkcjonalne.",
    features: ["Konstrukcja stalowa", "Stopnie drewniane lub stalowe", "Na małe przestrzenie"],
  },
  {
    title: "Schody na konstrukcji",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    desc: "Solidna konstrukcja z profili stalowych jako fundament dla dowolnych stopni.",
    features: ["Profile stalowe HEB/IPE", "Spawanie certyfikowane", "Duże obciążenia"],
  },
];

const process = [
  { step: "01", title: "Pomiar i projekt", desc: "Przyjeżdżamy do Ciebie, mierzymy i projektujemy w 3D." },
  { step: "02", title: "Wycena", desc: "W ciągu 24h otrzymujesz szczegółową wycenę." },
  { step: "03", title: "Produkcja", desc: "Produkcja we własnym zakładzie — pełna kontrola jakości." },
  { step: "04", title: "Montaż", desc: "Profesjonalny montaż przez nasz doświadczony team." },
];

export default function StairsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1600&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 to-zinc-950/60" />
        </div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection>
            <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
              <Link href="/" className="hover:text-zinc-300">Strona główna</Link>
              <span>/</span>
              <Link href="/oferta" className="hover:text-zinc-300">Oferta</Link>
              <span>/</span>
              <span className="text-amber-400">Schody stalowe</span>
            </nav>
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4">
              <span className="h-px w-8 bg-amber-400/60" />
              Oferta — Schody
            </div>
            <h1
              className="text-5xl sm:text-6xl font-black text-white mb-6 max-w-2xl leading-tight"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Schody stalowe
              <br />
              <span className="text-gradient-gold">na każde wnętrze</span>
            </h1>
            <p className="text-zinc-300 text-xl max-w-xl leading-relaxed mb-8">
              Projektujemy i produkujemy schody stalowe, loftowe, wspornikowe,
              dywanowe i zabiegowe. Każdy projekt jest unikalny.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-[1.02]"
            >
              Zamów bezpłatną wycenę
              <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Types */}
      <section className="py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <AnimatedSection>
              <h2
                className="text-3xl sm:text-4xl font-black text-white mb-3"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Rodzaje schodów
              </h2>
              <p className="text-zinc-400 text-lg">
                Dobieramy typ do Twojego wnętrza i budżetu
              </p>
            </AnimatedSection>
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {types.map((type) => (
              <StaggerItem key={type.title}>
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition-all duration-300 group hover-lift">
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${type.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3
                      className="text-white font-bold text-xl mb-2 group-hover:text-amber-400 transition-colors"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {type.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                      {type.desc}
                    </p>
                    <div className="space-y-2">
                      {type.features.map((f) => (
                        <div key={f} className="flex items-center gap-2">
                          <CheckCircle size={14} className="text-amber-400 shrink-0" />
                          <span className="text-zinc-300 text-sm">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-zinc-900/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <AnimatedSection>
              <h2
                className="text-3xl sm:text-4xl font-black text-white mb-3"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Jak pracujemy?
              </h2>
            </AnimatedSection>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <AnimatedSection key={p.step} delay={i * 0.1}>
                <div className="text-center">
                  <div
                    className="text-5xl font-black text-amber-500/20 mb-3"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {p.step}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{p.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
