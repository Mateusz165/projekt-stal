import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Oferta",
  description:
    "Kompleksowa oferta Projekt-Stal: schody stalowe i loftowe, balustrady, ogrodzenia, bramy, tarasy, zadaszenia i garaże stalowe. Realizacje na zamówienie.",
};

const services = [
  {
    title: "Schody stalowe",
    slug: "schody",
    image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&q=80",
    types: ["Loftowe", "Dywanowe", "Wspornikowe", "Zabiegowe", "Na konstrukcji"],
    desc: "Schody to serce domu. Projektujemy i wykonujemy każdy rodzaj schodów stalowych — od klasycznych po ultranowoczesne.",
  },
  {
    title: "Balustrady",
    slug: "balustrady",
    image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80",
    types: ["Stalowe", "Nierdzewne", "Szklane", "Kombinowane"],
    desc: "Eleganckie balustrady dopełniają schody. Dostępne w stali, stali nierdzewnej, ze szkłem i w kombinacjach.",
  },
  {
    title: "Ogrodzenia",
    slug: "ogrodzenia",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    types: ["Nowoczesne", "Panelowe", "Palisadowe", "Na zamówienie"],
    desc: "Nowoczesne ogrodzenia metalowe — trwałe, estetyczne i dopasowane do charakteru budynku.",
  },
  {
    title: "Bramy",
    slug: "bramy",
    image: "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=800&q=80",
    types: ["Garażowe", "Przesuwne", "Skrzydłowe", "Z napędem"],
    desc: "Bramy garażowe, przesuwne i skrzydłowe — z opcją automatyki i systemu smart home.",
  },
  {
    title: "Tarasy i zadaszenia",
    slug: "tarasy",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    types: ["Tarasy stalowe", "Pergole", "Zadaszenia szklane", "Wiaty"],
    desc: "Tarasy i zadaszenia stalowe — nowoczesne rozwiązania do każdego ogrodu i tarasu.",
  },
  {
    title: "Garaże stalowe",
    slug: "garaze",
    image: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=800&q=80",
    types: ["Wolnostojące", "Blaszane", "Premium", "Na wymiar"],
    desc: "Garaże stalowe wolnostojące — trwała i ekonomiczna alternatywa dla tradycyjnych garaży.",
  },
  {
    title: "Konstrukcje na wymiar",
    slug: "konstrukcje",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80",
    types: ["Konstrukcje przemysłowe", "Meble metalowe", "Elementy dekoracyjne"],
    desc: "Każdy projekt jest inny — wykonujemy indywidualne konstrukcje stalowe według wymagań klienta.",
  },
];

export default function OfferPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4">
              <span className="h-px w-8 bg-amber-400/60" />
              Oferta
            </div>
            <h1
              className="text-5xl sm:text-6xl font-black text-white mb-5 max-w-2xl leading-tight"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Kompleksowe
              <br />
              <span className="text-gradient-gold">konstrukcje stalowe</span>
            </h1>
            <p className="text-zinc-300 text-xl max-w-xl leading-relaxed">
              Od projektu przez produkcję aż po montaż — kompleksowe realizacje
              ze stali i materiałów premium.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="space-y-6">
            {services.map((service, i) => (
              <StaggerItem key={service.slug}>
                <Link
                  href={`/oferta/${service.slug}`}
                  className="group flex flex-col md:flex-row bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-2xl overflow-hidden transition-all duration-300 hover-lift"
                >
                  {/* Image */}
                  <div className={`relative h-56 md:h-auto md:w-72 lg:w-96 shrink-0 overflow-hidden ${i % 2 !== 0 ? "md:order-2" : ""}`}>
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${service.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zinc-900/20 md:block hidden" />
                  </div>
                  {/* Content */}
                  <div className={`flex flex-col justify-center p-8 flex-1 ${i % 2 !== 0 ? "md:order-1" : ""}`}>
                    <div className="flex items-start justify-between mb-3">
                      <h2
                        className="text-2xl sm:text-3xl font-black text-white group-hover:text-amber-400 transition-colors"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        {service.title}
                      </h2>
                      <ArrowUpRight
                        size={22}
                        className="text-zinc-600 group-hover:text-amber-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0 mt-1"
                      />
                    </div>
                    <p className="text-zinc-300 mb-5 leading-relaxed">{service.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.types.map((type) => (
                        <span
                          key={type}
                          className="bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-medium px-3 py-1 rounded-full"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CTASection />
    </>
  );
}
