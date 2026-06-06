import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id: Number(id) } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.blogPost.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const text = await req.text();
  if (text.includes("_method=DELETE")) {
    await prisma.blogPost.delete({ where: { id: Number(id) } });
    return NextResponse.redirect(new URL("/admin/blog", req.url), 303);
  }
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const post = await prisma.blogPost.update({
    where: { id: Number(id) },
    data: {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt || "",
      content: body.content || "",
      category: body.category,
      image: body.image || null,
      published: Boolean(body.published),
    },
  });

  return NextResponse.json(post);
}
