import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const current = await prisma.testimonial.findUnique({ where: { id }, select: { published: true } });
  if (!current) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.testimonial.update({ where: { id }, data: { published: !current.published } });

  return NextResponse.redirect(new URL("/admin/opinie", req.url), 303);
}
