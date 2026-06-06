import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id: Number(id) } });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(project);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.project.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const text = await req.text();
  if (text.includes("_method=DELETE")) {
    await prisma.project.delete({ where: { id: Number(id) } });
    return NextResponse.redirect(new URL("/admin/realizacje", req.url), 303);
  }
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const { title, category, location, year, featured, images } = body;

  const project = await prisma.project.update({
    where: { id: Number(id) },
    data: {
      title,
      category,
      location,
      year: Number(year),
      featured: Boolean(featured),
      images: JSON.stringify(Array.isArray(images) ? images.filter(Boolean) : []),
    },
  });

  return NextResponse.json(project);
}
