import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id: Number(id) } });
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.product.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const product = await prisma.product.update({
    where: { id: Number(id) },
    data: {
      name: body.name,
      slug: body.slug,
      description: body.description || "",
      price: Number(body.price),
      oldPrice: body.oldPrice ? Number(body.oldPrice) : null,
      category: body.category,
      badge: body.badge || null,
      stock: Boolean(body.stock),
      published: Boolean(body.published),
      rating: Number(body.rating) || 5.0,
      reviewCount: Number(body.reviewCount) || 0,
      images: JSON.stringify(Array.isArray(body.images) ? body.images.filter(Boolean) : []),
    },
  });

  return NextResponse.json(product);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const text = await req.text();
  if (text.includes("_method=DELETE")) {
    await prisma.product.delete({ where: { id: Number(id) } });
    return NextResponse.redirect(new URL("/admin/sklep", req.url), 303);
  }
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
