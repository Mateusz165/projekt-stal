export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import SklpClient from "./SklpClient";

export const metadata: Metadata = {
  title: "Sklep – Projekt-Stal Białystok",
  description: "Sklep Projekt-Stal: komponenty, akcesoria i materiały do konstrukcji stalowych. Słupki balustradowe, poręcze, stopnie schodowe i więcej.",
};

export default async function ShopPage() {
  const dbProducts = await prisma.product.findMany({
    where: { published: true },
    orderBy: [{ category: "asc" }, { name: "asc" }],
  }).catch(() => []);

  const products = dbProducts.map((p) => {
    const images = JSON.parse(p.images) as string[];
    return {
      id: p.id, slug: p.slug, name: p.name, category: p.category,
      price: p.price, oldPrice: p.oldPrice, rating: p.rating,
      reviewCount: p.reviewCount, stock: p.stock, badge: p.badge,
      image: images[0] ?? "", images,
      description: p.description,
    };
  });

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4">
              <span className="h-px w-8 bg-amber-400/60" />
              Sklep
            </div>
            <h1
              className="text-5xl sm:text-6xl font-black text-white mb-3 leading-tight"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Sklep
              <br />
              <span className="text-gradient-gold">stalowy</span>
            </h1>
            <p className="text-zinc-300 text-lg">
              Komponenty, akcesoria i materiały do Twoich realizacji.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SklpClient products={products} />
        </div>
      </section>
    </>
  );
}
