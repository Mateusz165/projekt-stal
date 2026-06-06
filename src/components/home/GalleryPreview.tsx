"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, ZoomIn } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

type GalleryItem = { id: number; title: string; category: string; image: string; span: string };

const ALL_CATEGORIES = ["Wszystkie", "Schody", "Balustrady", "Ogrodzenia", "Tarasy", "Bramy", "Garaże", "Zadaszenia"];

export default function GalleryPreview({ items }: { items: GalleryItem[] }) {
  const [activeCategory, setActiveCategory] = useState("Wszystkie");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const categories = ["Wszystkie", ...Array.from(new Set(items.map((i) => i.category)))];
  const displayCategories = ALL_CATEGORIES.filter((c) => categories.includes(c));

  const filtered =
    activeCategory === "Wszystkie"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4">
              <span className="h-px w-8 bg-amber-400/60" />
              Galeria realizacji
              <span className="h-px w-8 bg-amber-400/60" />
            </div>
            <h2
              className="text-4xl sm:text-5xl font-black text-white mb-4"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Nasze najlepsze
              <br />
              <span className="text-gradient-gold">realizacje</span>
            </h2>
          </AnimatedSection>
        </div>

        {/* Filter tabs */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {displayCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-amber-500 text-zinc-950"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px]"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`group relative overflow-hidden rounded-xl cursor-pointer ${item.span}`}
                onClick={() => setLightbox(item)}
              >
                {item.image ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-zinc-800" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/20 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-amber-400 text-xs font-medium uppercase tracking-wider">{item.category}</span>
                  <h3 className="text-white font-semibold text-sm mt-0.5">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <AnimatedSection delay={0.2}>
          <div className="text-center mt-10">
            <Link
              href="/realizacje"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-8 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02]"
            >
              Zobacz wszystkie realizacje
              <ArrowRight size={16} />
            </Link>
          </div>
        </AnimatedSection>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative max-w-3xl w-full max-h-[80vh] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {lightbox.image && (
                <img src={lightbox.image} alt={lightbox.title} className="w-full h-full object-cover" />
              )}
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 bg-zinc-950/80 hover:bg-zinc-800 text-white p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-zinc-950 to-transparent">
                <div className="text-amber-400 text-xs uppercase tracking-wider mb-1">{lightbox.category}</div>
                <div className="text-white font-bold text-lg">{lightbox.title}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
