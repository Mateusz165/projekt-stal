"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";

const services = [
  {
    id: "schody",
    title: "Schody stalowe",
    subtitle: "Loftowe · Wspornikowe · Zabiegowe",
    description:
      "Schody stalowe to nasza specjalność. Projektujemy i wykonujemy schody dywanowe, wspornikowe, zabiegowe i loftowe.",
    href: "/oferta/schody",
    image: "/images/schody-kopisk1.jpg",
    accent: "from-amber-500/20 to-transparent",
  },
  {
    id: "balustrady",
    title: "Balustrady",
    subtitle: "Stalowe · Nierdzewne · Szklane",
    description:
      "Eleganckie balustrady ze stali nierdzewnej, z wypełnieniem szklanym lub stalowymi prętami.",
    href: "/oferta/balustrady",
    image: "/images/balustrada-harfa1.jpg",
    accent: "from-zinc-500/20 to-transparent",
  },
  {
    id: "ogrodzenia",
    title: "Ogrodzenia",
    subtitle: "Nowoczesne · Panelowe · Palisadowe",
    description:
      "Nowoczesne ogrodzenia metalowe — panelowe, palisadowe i na indywidualne zamówienie.",
    href: "/oferta/ogrodzenia",
    image: "/images/ogrodzenie-dobrzyniewo1.jpg",
    accent: "from-blue-500/10 to-transparent",
  },
  {
    id: "bramy",
    title: "Bramy",
    subtitle: "Garażowe · Przesuwne · Skrzydłowe",
    description:
      "Bramy garażowe, przesuwne i skrzydłowe z napędem automatycznym lub ręczne.",
    href: "/oferta/bramy",
    image: "/images/brama-nowodworce1.jpg",
    accent: "from-amber-500/15 to-transparent",
  },
  {
    id: "tarasy",
    title: "Tarasy i zadaszenia",
    subtitle: "Stalowe · Aluminiowe · Szklane",
    description:
      "Tarasy, pergole i zadaszenia stalowe dostosowane do każdej architektury.",
    href: "/oferta/tarasy",
    image: "/images/garaz-wiedenska1.jpg",
    accent: "from-zinc-400/10 to-transparent",
  },
  {
    id: "garaze",
    title: "Garaże stalowe",
    subtitle: "Wolnostojące · Na wymiar",
    description:
      "Garaże stalowe wolnostojące i blaszane na indywidualne zamówienie — trwałe i estetyczne.",
    href: "/oferta/garaze",
    image: "/images/garaz-wiedenska2.jpg",
    accent: "from-amber-500/10 to-transparent",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4"
          >
            <span className="h-px w-8 bg-amber-400/60" />
            Nasza oferta
            <span className="h-px w-8 bg-amber-400/60" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Kompleksowe wykonanie
            <br />
            <span className="text-gradient-gold">konstrukcji stalowych</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-400 text-lg max-w-2xl mx-auto"
          >
            Od projektu przez produkcję aż po montaż — zajmujemy się każdym
            etapem realizacji.
          </motion.p>
        </div>

        {/* Services Grid */}
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.08}
        >
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <Link href={service.href} className="group block relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all duration-500 hover-lift">
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${service.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-white font-bold text-lg group-hover:text-amber-400 transition-colors" style={{ fontFamily: "var(--font-outfit)" }}>
                        {service.title}
                      </h3>
                      <p className="text-amber-500 text-xs font-medium tracking-wide mt-0.5">
                        {service.subtitle}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="text-zinc-600 group-hover:text-amber-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0 mt-1"
                    />
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500/0 via-amber-500 to-amber-500/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/oferta"
            className="inline-flex items-center gap-2 border border-amber-500/40 hover:border-amber-500 text-amber-400 hover:text-amber-300 font-semibold px-8 py-3 rounded-xl transition-all duration-200"
          >
            Zobacz pełną ofertę
            <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
