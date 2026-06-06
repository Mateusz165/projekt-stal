"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

type Testimonial = { id: number; name: string; location: string; rating: number; text: string; project: string };

const FALLBACK: Testimonial[] = [
  { id: 1, name: "Tomasz Kowalski", location: "Białystok", rating: 5, text: "Zamówiłem schody wspornikowe z dębowymi stopniami. Efekt przeszedł moje oczekiwania — perfekcyjne wykonanie, precyzyjny montaż i profesjonalne podejście. Polecam każdemu!", project: "Schody wspornikowe" },
  { id: 2, name: "Anna Wiśniewska", location: "Warszawa", rating: 5, text: "Balustrada szklana na schodach wygląda przepięknie. Pan Mateusz bardzo pomocny, doradził najlepsze rozwiązanie. Montaż szybki i bez zbędnych komplikacji.", project: "Balustrada szklana" },
  { id: 3, name: "Marek Lewandowski", location: "Łomża", rating: 5, text: "Ogrodzenie panelowe z automatyczną bramą przesuwną — wszystko wykonane na najwyższym poziomie. Kontakt bezproblemowy, wycena przyszła tego samego dnia.", project: "Ogrodzenie + brama" },
];

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const data = testimonials.length > 0 ? testimonials : FALLBACK;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const paginate = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + data.length) % data.length);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => paginate(1), 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  });

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  const item = data[current];

  return (
    <section className="py-24 bg-zinc-900/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4">
              <span className="h-px w-8 bg-amber-400/60" />
              Opinie klientów
              <span className="h-px w-8 bg-amber-400/60" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white" style={{ fontFamily: "var(--font-outfit)" }}>
              Co mówią nasi
              <br />
              <span className="text-gradient-gold">klienci?</span>
            </h2>
          </AnimatedSection>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-12 relative">
                  <Quote size={48} className="text-amber-500/15 absolute top-6 left-6" />
                  <div className="relative z-10">
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} size={18} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <blockquote className="text-zinc-200 text-lg md:text-xl leading-relaxed mb-8 italic">
                      &ldquo;{item.text}&rdquo;
                    </blockquote>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                          <span className="text-amber-400 font-bold text-lg">{item.name[0]}</span>
                        </div>
                        <div>
                          <div className="text-white font-semibold">{item.name}</div>
                          <div className="text-zinc-500 text-sm">{item.location}</div>
                        </div>
                      </div>
                      {item.project && (
                        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium px-3 py-1.5 rounded-full">
                          {item.project}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={() => paginate(-1)} className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-200">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {data.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-amber-400" : "w-2 h-2 bg-zinc-700 hover:bg-zinc-500"}`}
                />
              ))}
            </div>
            <button onClick={() => paginate(1)} className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-200">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
