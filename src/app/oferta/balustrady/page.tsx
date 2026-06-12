import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Balustrady stalowe, szklane i nierdzewne",
  description:
    "Balustrady stalowe, nierdzewne i szklane na zamówienie. Projekt-Stal Białystok – eleganckie balustrady wewnętrzne i zewnętrzne.",
};

const types = [
  {
    title: "Balustrady stalowe",
    image: "/images/balustrada-niecki1.jpg",
    features: ["Profil stalowy lakierowany", "Kolor RAL na życzenie", "Proszek lub mokry lakier"],
    desc: "Klasyczne balustrady ze stali konstrukcyjnej. Lakierowane proszkowo w dowolnym kolorze RAL.",
  },
  {
    title: "Balustrady nierdzewne",
    image: "/images/balustrada-jurowce1.jpg",
    features: ["Stal AISI 304 lub 316", "Polerowana lub satynowa", "Odporność na korozję"],
    desc: "Nowoczesne balustrady ze stali nierdzewnej — trwałe, odporne na korozję i łatwe w czyszczeniu.",
  },
  {
    title: "Balustrady szklane",
    image: "/images/balustrada-na-zloto1.jpg",
    features: ["Szkło hartowane 8-12mm", "Uchwyty punktowe lub listwowe", "Opcja frameless"],
    desc: "Transparentne balustrady szklane — pełne, pół-pełne lub z punktowymi mocowaniami szkła.",
  },
  {
    title: "Balustrady kombinowane",
    image: "/images/balustrada-schody-dobrzyniewo1.jpg",
    features: ["Stal + szkło", "Stal + drewno", "Nierdzewna + szkło"],
    desc: "Połączenie materiałów dla unikalnego efektu estetycznego — stal z drewnem lub szkłem.",
  },
];

export default function BalustradesPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection>
            <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
              <Link href="/" className="hover:text-zinc-300">Strona główna</Link>
              <span>/</span>
              <Link href="/oferta" className="hover:text-zinc-300">Oferta</Link>
              <span>/</span>
              <span className="text-amber-400">Balustrady</span>
            </nav>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
              Balustrady<br /><span className="text-gradient-gold">stalowe i szklane</span>
            </h1>
            <p className="text-zinc-300 text-xl max-w-xl leading-relaxed mb-8">
              Eleganckie balustrady na schody, tarasy i balkony — w stali, szkle i kombinacjach.
            </p>
            <Link href="/kontakt" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-8 py-4 rounded-xl transition-all duration-200">
              Zamów wycenę <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {types.map((type) => (
              <StaggerItem key={type.title}>
                <div className="bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-2xl overflow-hidden group hover-lift transition-all duration-300">
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${type.image}')` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-white font-bold text-xl mb-2 group-hover:text-amber-400 transition-colors" style={{ fontFamily: "var(--font-outfit)" }}>{type.title}</h3>
                    <p className="text-zinc-400 text-sm mb-4">{type.desc}</p>
                    <div className="space-y-1.5">
                      {type.features.map((f) => (
                        <div key={f} className="flex items-center gap-2">
                          <CheckCircle size={13} className="text-amber-400 shrink-0" />
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

      <CTASection />
    </>
  );
}
