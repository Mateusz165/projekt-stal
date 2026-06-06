import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, category, location, year, featured, images } = body;

  if (!title || !category || !location) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const project = await prisma.project.create({
    data: {
      title,
      category,
      location,
      year: Number(year) || new Date().getFullYear(),
      featured: Boolean(featured),
      images: JSON.stringify(Array.isArray(images) ? images.filter(Boolean) : []),
    },
  });

  return NextResponse.json(project, { status: 201 });
}
