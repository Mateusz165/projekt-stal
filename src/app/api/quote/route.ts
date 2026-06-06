import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import prisma from "@/lib/prisma";
import { sendQuoteNotification } from "@/lib/email";

const schema = z.object({
  type: z.string(),
  width: z.string(),
  height: z.string(),
  length: z.string().optional(),
  location: z.string(),
  description: z.string().optional(),
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    await prisma.quoteRequest.create({
      data: {
        type: data.type,
        width: data.width,
        height: data.height,
        length: data.length ?? null,
        location: data.location,
        description: data.description ?? null,
        name: data.name,
        phone: data.phone,
        email: data.email,
        status: "new",
      },
    });

    sendQuoteNotification(data).catch(() => {});

    return NextResponse.json(
      { success: true, message: "Zapytanie o wycenę wysłane pomyślnie." },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: "Wystąpił błąd serwera." }, { status: 500 });
  }
}
