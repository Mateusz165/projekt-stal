export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ProductDetail from "./ProductDetail";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug, published: true } });
  if (!product) return {};
  return {
    title: `${product.name} | Sklep Projekt-Stal`,
    description: product.description.slice(0, 160),
  };
}

function parseImages(raw: string): string[] {
  try { return JSON.parse(raw) as string[]; } catch { return []; }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug, published: true } }).catch(() => null);
  if (!product) notFound();

  const images = parseImages(product.images);

  const related = await prisma.product.findMany({
    where: { category: product.category, published: true, stock: true, NOT: { id: product.id } },
    orderBy: { rating: "desc" },
    take: 4,
  }).catch(() => []);

  return (
    <ProductDetail
      product={{ ...product, images, image: images[0] ?? "" }}
      related={related.map((p) => ({ ...p, images: parseImages(p.images), image: parseImages(p.images)[0] ?? "" }))}
    />
  );
}
