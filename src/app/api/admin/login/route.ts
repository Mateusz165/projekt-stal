import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import prisma from "@/lib/prisma";
import { verifyPassword, createToken, COOKIE_NAME, COOKIE_OPTIONS } from "@/lib/auth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = schema.parse(body);

    const user = await prisma.adminUser.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Nieprawidłowy e-mail lub hasło." }, { status: 401 });
    }

    const valid = await verifyPassword(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: "Nieprawidłowy e-mail lub hasło." }, { status: 401 });
    }

    const token = await createToken(user.id, user.email);

    const response = NextResponse.json({ ok: true });
    response.cookies.set(COOKIE_NAME, token, COOKIE_OPTIONS);
    return response;
  } catch {
    return NextResponse.json({ error: "Błąd serwera." }, { status: 500 });
  }
}
