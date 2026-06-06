import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import prisma from "@/lib/prisma";
import { sendContactNotification } from "@/lib/email";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone ?? null,
        subject: data.subject,
        message: data.message,
        read: false,
      },
    });

    sendContactNotification(data).catch(() => {});

    return NextResponse.json(
      { success: true, message: "Wiadomość wysłana pomyślnie." },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: "Wystąpił błąd serwera." }, { status: 500 });
  }
}
