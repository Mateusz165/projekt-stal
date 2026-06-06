"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Phone, ChevronDown } from "lucide-react";
import { COMPANY } from "@/lib/utils";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[700px] flex items-center overflow-hidden"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY, scale }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-zinc-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
      </motion.div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20"
      >
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Białystok & okolice · Cała Polska
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Tworzymy{" "}
            <span className="text-gradient-gold">nowoczesne</span>
            <br />
            konstrukcje stalowe
            <br />
            <span className="text-zinc-300">na lata</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-zinc-300 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl"
          >
            Schody stalowe i loftowe, balustrady, ogrodzenia, bramy i zadaszenia.
            Projektujemy, produkujemy i montujemy — z pasji do stali.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Link
              href="/kontakt"
              className="group inline-flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Darmowa wycena
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/realizacje"
              className="inline-flex items-center justify-center gap-3 border border-zinc-600 hover:border-zinc-400 text-zinc-200 hover:text-white font-semibold text-base px-8 py-4 rounded-xl backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-200"
            >
              Zobacz realizacje
            </Link>
            <a
              href={COMPANY.phoneHref}
              className="inline-flex items-center justify-center gap-2 text-zinc-300 hover:text-amber-400 font-semibold text-base transition-colors md:hidden"
            >
              <Phone size={16} />
              {COMPANY.phone}
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-8"
          >
            {[
              { value: "500+", label: "Realizacji" },
              { value: "10+", label: "Lat doświadczenia" },
              { value: "100%", label: "Satysfakcji" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-px h-8 bg-amber-500/40" />
                <div>
                  <div className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-outfit)" }}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-400 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500"
      >
        <span className="text-xs tracking-widest uppercase">Przewiń</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
