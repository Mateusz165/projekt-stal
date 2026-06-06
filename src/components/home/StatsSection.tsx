"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Clock, Users, Wrench } from "lucide-react";

type Props = { projectCount?: number };

export default function StatsSection({ projectCount }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    {
      icon: Award,
      value: projectCount && projectCount > 10 ? `${projectCount}+` : "500+",
      label: "Zrealizowanych projektów",
      sub: "w całej Polsce",
    },
    {
      icon: Clock,
      value: "10+",
      label: "Lat doświadczenia",
      sub: "na rynku stalowym",
    },
    {
      icon: Users,
      value: "98%",
      label: "Zadowolonych klientów",
      sub: "potwierdzonych opinią",
    },
    {
      icon: Wrench,
      value: "24h",
      label: "Czas odpowiedzi",
      sub: "na zapytanie ofertowe",
    },
  ];

  return (
    <section ref={ref} className="py-16 bg-amber-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-30" />
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-amber-400/30 -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-amber-600/20 translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-zinc-950/10 flex items-center justify-center mx-auto mb-3">
                  <Icon size={22} className="text-zinc-950" />
                </div>
                <div
                  className="text-4xl sm:text-5xl font-black text-zinc-950 mb-1"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {stat.value}
                </div>
                <div className="text-zinc-900 font-semibold text-sm mb-0.5">{stat.label}</div>
                <div className="text-zinc-700 text-xs">{stat.sub}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
