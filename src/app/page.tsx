export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import StatsSection from "@/components/home/StatsSection";
import GalleryPreview from "@/components/home/GalleryPreview";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Projekt-Stal Mateusz Partyka | Schody stalowe, balustrady, ogrodzenia – Białystok",
  description:
    "Projekt-Stal Mateusz Partyka – nowoczesne schody stalowe, loftowe, balustrady, ogrodzenia, bramy i zadaszenia. Realizacje na terenie całej Polski. Darmowa wycena: 664 757 520",
  alternates: {
    canonical: "https://projekt-stal.pl",
  },
};

export default async function HomePage() {
  const [projects, testimonials, projectCount] = await Promise.all([
    prisma.project.findMany({ orderBy: [{ featured: "desc" }, { createdAt: "desc" }], take: 6 }).catch(() => []),
    prisma.testimonial.findMany({ where: { published: true }, orderBy: { createdAt: "desc" }, take: 8 }).catch(() => []),
    prisma.project.count().catch(() => 0),
  ]);

  const galleryItems = projects.map((p, i) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    image: (JSON.parse(p.images) as string[])[0] ?? "",
    span: i === 0 ? "col-span-2 row-span-2" : i === projects.length - 1 ? "col-span-2" : "",
  }));

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <StatsSection projectCount={projectCount} />
      <GalleryPreview items={galleryItems} />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection />
    </>
  );
}
