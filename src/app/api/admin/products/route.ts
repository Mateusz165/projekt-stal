import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, slug, description, price, oldPrice, category, badge, stock, published, rating, reviewCount, images } = body;

  if (!name || !slug || !price) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const existing = await prisma.product.findUnique({ where: { slug } });
  if (existing) return NextResponse.json({ error: "Slug already exists" }, { status: 409 });

  const product = await prisma.product.create({
    data: {
      name,
      slug,
      description: description || "",
      price: Number(price),
      oldPrice: oldPrice ? Number(oldPrice) : null,
      category,
      badge: badge || null,
      stock: stock !== false,
      published: published !== false,
      rating: Number(rating) || 5.0,
      reviewCount: Number(reviewCount) || 0,
      images: JSON.stringify(Array.isArray(images) ? images.filter(Boolean) : []),
    },
  });

  return NextResponse.json(product, { status: 201 });
}
