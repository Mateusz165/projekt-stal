import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const contentType = req.headers.get("content-type") ?? "";

  if (contentType.includes("application/x-www-form-urlencoded")) {
    const text = await req.text();
    if (text.includes("_method=DELETE")) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
      if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
      await prisma.testimonial.delete({ where: { id: Number(id) } });
      return NextResponse.redirect(new URL("/admin/opinie", req.url), 303);
    }
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  const body = await req.json();
  const { name, location, project, text, rating, published } = body;

  if (!name || !text) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const testimonial = await prisma.testimonial.create({
    data: {
      name,
      location: location || "",
      project: project || "",
      text,
      rating: Number(rating) || 5,
      published: published !== false,
    },
  });

  return NextResponse.json(testimonial, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await prisma.testimonial.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}
