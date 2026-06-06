import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const { name, location, project, text, rating } = body;

  if (!name?.trim() || !text?.trim()) {
    return NextResponse.json({ error: "Imię i treść opinii są wymagane" }, { status: 400 });
  }
  if (text.length > 1000) {
    return NextResponse.json({ error: "Opinia jest zbyt długa (max 1000 znaków)" }, { status: 400 });
  }

  await prisma.testimonial.create({
    data: {
      name: name.trim().slice(0, 80),
      location: (location ?? "").trim().slice(0, 80),
      project: (project ?? "").trim().slice(0, 80),
      text: text.trim(),
      rating: Math.min(5, Math.max(1, Number(rating) || 5)),
      published: false,
    },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
