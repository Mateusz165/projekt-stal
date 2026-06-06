import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id: Number(id) } });
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updated = await prisma.product.update({
    where: { id: Number(id) },
    data: { stock: !product.stock },
  });

  return NextResponse.json(updated);
}
