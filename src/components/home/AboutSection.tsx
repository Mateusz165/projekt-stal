"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const features = [
  "Projektowanie i produkcja w jednym miejscu",
  "Indywidualne podejście do każdego zlecenia",
  "Montaż na terenie całej Polski",
  "Materiały najwyższej jakości",
  "Gwarancja na wykonane konstrukcje",
  "Bezpłatna wycena i doradztwo",
];

const stats = [
  { value: "500+", label: "Zrealizowanych projektów" },
  { value: "10+", label: "Lat na rynku" },
  { value: "98%", label: "Zadowolonych klientów" },
  { value: "24h", label: "Czas odpowiedzi" },
];

export default function AboutSection() {
  return (
    <section className="py-24 bg-zinc-900/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image collage */}
          <AnimatedSection direction="left">
            <div className="relative">
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden h-[500px] shadow-2xl shadow-black/50">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent" />
              </div>

              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-zinc-950 border border-zinc-800 rounded-xl p-5 shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <span className="text-amber-400 font-black text-xl" style={{ fontFamily: "var(--font-outfit)" }}>
                      10+
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">
                      Lat doświadczenia
                    </div>
                    <div className="text-zinc-400 text-xs mt-0.5">
                      w branży stalowej
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Top badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -top-4 -left-4 bg-amber-500 text-zinc-950 font-bold text-xs px-4 py-2 rounded-full shadow-lg"
              >
                ★ Premium Quality
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Right: Content */}
          <AnimatedSection direction="right" delay={0.1}>
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4">
                  <span className="h-px w-8 bg-amber-400/60" />
                  O firmie
                </div>
                <h2
                  className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  Pasja do stali
                  <br />
                  <span className="text-gradient-gold">od ponad 10 lat</span>
                </h2>
                <p className="text-zinc-300 text-lg leading-relaxed mb-4">
                  Projekt-Stal Mateusz Partyka to firma specjalizująca się w wykonywaniu
                  nowoczesnych konstrukcji stalowych dla klientów indywidualnych i firm.
                </p>
                <p className="text-zinc-400 leading-relaxed">
                  Specjalizujemy się w projektowaniu, produkcji i montażu schodów
                  stalowych i loftowych, balustrad, ogrodzeń, bram, tarasów,
                  zadaszeń, garaży stalowych oraz konstrukcji indywidualnych.
                  Każde zlecenie traktujemy z pełnym zaangażowaniem.
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle
                      size={16}
                      className="text-amber-400 shrink-0"
                    />
                    <span className="text-zinc-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Stats mini */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                    <div
                      className="text-2xl font-black text-amber-400 mb-1"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-zinc-500 text-xs leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/o-firmie"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-7 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02]"
              >
                Poznaj naszą historię
                <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
