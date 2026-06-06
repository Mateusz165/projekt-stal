import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, slug, excerpt, content, category, image, published } = body;

  if (!title || !slug) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const existing = await prisma.blogPost.findUnique({ where: { slug } });
  if (existing) return NextResponse.json({ error: "Slug already exists" }, { status: 409 });

  const post = await prisma.blogPost.create({
    data: { title, slug, excerpt: excerpt || "", content: content || "", category, image: image || null, published: Boolean(published) },
  });

  return NextResponse.json(post, { status: 201 });
}
