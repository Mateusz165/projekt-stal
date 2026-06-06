import type { Metadata } from "next";
import { CheckCircle, Award, Users, Wrench, Clock, MapPin } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "O firmie",
  description:
    "Projekt-Stal Mateusz Partyka – doświadczona firma stalowa z Białegostoku. Poznaj naszą historię, wartości i zespół specjalistów zajmujących się nowoczesnymi konstrukcjami stalowymi.",
};

const values = [
  {
    icon: Award,
    title: "Jakość premium",
    desc: "Używamy wyłącznie certyfikowanych materiałów stalowych najwyższej klasy.",
  },
  {
    icon: Wrench,
    title: "Własna produkcja",
    desc: "Wszystko produkujemy we własnym warsztacie — pełna kontrola jakości.",
  },
  {
    icon: Users,
    title: "Doświadczony zespół",
    desc: "Nasi spawacze i montażyści posiadają wieloletnie doświadczenie i certyfikaty.",
  },
  {
    icon: Clock,
    title: "Terminowość",
    desc: "Dotrzymujemy ustalonych terminów — szanujemy czas naszych klientów.",
  },
  {
    icon: MapPin,
    title: "Cała Polska",
    desc: "Realizujemy projekty na terenie całej Polski — dojeżdżamy do klienta.",
  },
  {
    icon: CheckCircle,
    title: "Gwarancja",
    desc: "Każda realizacja objęta jest gwarancją i pełnym wsparciem po montażu.",
  },
];

const timeline = [
  { year: "2014", title: "Założenie firmy", desc: "Projekt-Stal startuje w Białymstoku." },
  { year: "2016", title: "Pierwsze 100 realizacji", desc: "Szybki rozwój i rozszerzenie oferty o balustrady i ogrodzenia." },
  { year: "2019", title: "Własny zakład", desc: "Otwarcie własnego warsztatu produkcyjnego z nowoczesnym parkiem maszynowym." },
  { year: "2021", title: "500 projektów", desc: "Przekroczenie progu 500 zrealizowanych konstrukcji stalowych." },
  { year: "2024", title: "Ekspansja ogólnopolska", desc: "Rozszerzenie działalności na teren całej Polski." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-zinc-950" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4">
              <span className="h-px w-8 bg-amber-400/60" />
              O nas
            </div>
            <h1
              className="text-5xl sm:text-6xl font-black text-white mb-6 max-w-2xl leading-tight"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Pasja do stali
              <br />
              <span className="text-gradient-gold">od ponad 10 lat</span>
            </h1>
            <p className="text-zinc-300 text-xl max-w-xl leading-relaxed">
              Projekt-Stal Mateusz Partyka to firma z Białegostoku specjalizująca
              się w nowoczesnych konstrukcjach stalowych — od schodów po bramy.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <div className="relative rounded-2xl overflow-hidden h-[480px]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80')`,
                  }}
                />
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.1}>
              <div className="space-y-6">
                <h2
                  className="text-3xl sm:text-4xl font-black text-white"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  Kim jesteśmy?
                </h2>
                <div className="space-y-4 text-zinc-300 leading-relaxed">
                  <p>
                    Projekt-Stal Mateusz Partyka to firma z Białegostoku, która od
                    ponad 10 lat tworzy nowoczesne konstrukcje stalowe dla klientów
                    indywidualnych i biznesowych w całej Polsce.
                  </p>
                  <p>
                    Nasza specjalizacja to schody stalowe i loftowe, balustrady ze
                    stali nierdzewnej i ze szkłem, ogrodzenia panelowe i palisadowe,
                    bramy garażowe i wjazdowe, tarasy stalowe, zadaszenia oraz
                    indywidualne konstrukcje na zamówienie.
                  </p>
                  <p>
                    Każdy projekt realizujemy od A do Z — od projektu, przez
                    produkcję w naszym warsztacie, aż po montaż u klienta. Dbamy
                    o każdy detal, bo wiemy, że to właśnie detale tworzą efekt wow.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <AnimatedSection>
              <h2
                className="text-3xl sm:text-4xl font-black text-white mb-3"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Nasze wartości
              </h2>
              <p className="text-zinc-400 text-lg">
                Co wyróżnia nas na tle konkurencji
              </p>
            </AnimatedSection>
          </div>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <StaggerItem key={val.title}>
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-600 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                      <Icon size={22} className="text-amber-400" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">
                      {val.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <AnimatedSection>
              <h2
                className="text-3xl sm:text-4xl font-black text-white mb-3"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Nasza historia
              </h2>
            </AnimatedSection>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-zinc-800" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <AnimatedSection key={item.year} delay={i * 0.1}>
                  <div className="flex items-start gap-6 relative pl-20">
                    <div className="absolute left-0 w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                      <span
                        className="text-amber-400 font-black text-sm"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        {item.year}
                      </span>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex-1">
                      <h3 className="text-white font-bold text-lg mb-1">
                        {item.title}
                      </h3>
                      <p className="text-zinc-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
