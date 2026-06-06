"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ArrowRight } from "lucide-react";
import Link from "next/link";

type Project = { id: number; title: string; category: string; location: string; year: number; image: string };

const ALL_CATEGORIES = ["Wszystkie", "Schody", "Balustrady", "Ogrodzenia", "Tarasy", "Zadaszenia", "Bramy", "Garaże", "Inne"];

export default function RealizacjeClient({ projects }: { projects: Project[] }) {
  const presentCategories = Array.from(new Set(projects.map((p) => p.category)));
  const categories = ALL_CATEGORIES.filter((c) => c === "Wszystkie" || presentCategories.includes(c));

  const [activeCategory, setActiveCategory] = useState("Wszystkie");
  const [lightbox, setLightbox] = useState<Project | null>(null);

  const filtered =
    activeCategory === "Wszystkie"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-10 sticky top-20 z-10 bg-zinc-950/90 backdrop-blur-sm py-4 -mx-4 px-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === cat
                ? "bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/20"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group relative overflow-hidden rounded-2xl cursor-pointer bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all duration-300"
              onClick={() => setLightbox(project)}
            >
              <div className="relative h-64 overflow-hidden">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
                    <span className="text-zinc-600 text-xs">Brak zdjęcia</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn size={28} className="text-white drop-shadow-lg" />
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-amber-400 text-xs font-medium uppercase tracking-wider">{project.category}</span>
                  <span className="text-zinc-500 text-xs">{project.year}</span>
                </div>
                <h3 className="text-white font-semibold text-sm">{project.title}</h3>
                <p className="text-zinc-500 text-xs mt-0.5">📍 {project.location}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-zinc-500">Brak realizacji w tej kategorii.</div>
      )}

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
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden bg-zinc-900"
              onClick={(e) => e.stopPropagation()}
            >
              {lightbox.image && (
                <img src={lightbox.image} alt={lightbox.title} className="w-full max-h-[70vh] object-cover" />
              )}
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 bg-zinc-950/80 hover:bg-zinc-800 text-white p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              <div className="p-6 flex items-center justify-between">
                <div>
                  <div className="text-amber-400 text-xs uppercase tracking-wider mb-1">
                    {lightbox.category} · {lightbox.location} · {lightbox.year}
                  </div>
                  <div className="text-white font-bold text-xl">{lightbox.title}</div>
                </div>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-5 py-2.5 rounded-xl transition-all"
                  onClick={() => setLightbox(null)}
                >
                  Zamów podobny <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
