import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, hashPassword, verifyPassword } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { currentPassword, newPassword } = await req.json();

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: "Wypełnij wszystkie pola" }, { status: 400 });
  }
  if (newPassword.length < 8) {
    return NextResponse.json({ error: "Nowe hasło musi mieć min. 8 znaków" }, { status: 400 });
  }

  const user = await prisma.adminUser.findUnique({
    where: { id: session.id },
    select: { password: true },
  });
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const valid = await verifyPassword(currentPassword, user.password);
  if (!valid) return NextResponse.json({ error: "Aktualne hasło jest nieprawidłowe" }, { status: 400 });

  const hashed = await hashPassword(newPassword);
  await prisma.adminUser.update({ where: { id: session.id }, data: { password: hashed } });

  return NextResponse.json({ ok: true });
}
