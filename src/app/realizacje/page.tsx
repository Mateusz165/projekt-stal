export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import RealizacjeClient from "./RealizacjeClient";

export const metadata: Metadata = {
  title: "Realizacje – Projekt-Stal Białystok",
  description: "Galeria realizacji Projekt-Stal: schody stalowe, balustrady, ogrodzenia, bramy, zadaszenia. Ponad 500 projektów w całej Polsce.",
};

export default async function RealizationsPage() {
  const dbProjects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { year: "desc" }, { createdAt: "desc" }],
  }).catch(() => []);

  const projects = dbProjects.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    location: p.location,
    year: p.year,
    image: (JSON.parse(p.images) as string[])[0] ?? "",
  }));

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4">
              <span className="h-px w-8 bg-amber-400/60" />
              Portfolio
            </div>
            <h1
              className="text-5xl sm:text-6xl font-black text-white mb-5 max-w-2xl leading-tight"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Nasze
              <br />
              <span className="text-gradient-gold">realizacje</span>
            </h1>
            <p className="text-zinc-300 text-xl max-w-xl leading-relaxed">
              {projects.length > 0
                ? `${projects.length} zrealizowanych projektów. Każda konstrukcja to efekt pasji, precyzji i doświadczenia.`
                : "Ponad 500 zrealizowanych projektów w całej Polsce. Każda konstrukcja to efekt pasji, precyzji i doświadczenia."
              }
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RealizacjeClient projects={projects} />
        </div>
      </section>
    </>
  );
}
