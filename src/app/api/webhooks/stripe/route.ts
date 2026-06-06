import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Skip if order already exists for this session
    const existing = await prisma.order.findFirst({ where: { stripeId: session.id } });
    if (existing) return NextResponse.json({ received: true });

    const items = JSON.parse(session.metadata?.items ?? "[]") as { id: number; qty: number }[];
    if (!items.length) return NextResponse.json({ received: true });

    const products = await prisma.product.findMany({ where: { id: { in: items.map((i) => i.id) } } });
    const total = items.reduce((sum, item) => {
      const p = products.find((p) => p.id === item.id);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);

    const customer = session.customer_details;
    const address = customer?.address;

    await prisma.order.create({
      data: {
        stripeId: session.id,
        status: "paid",
        total,
        name: customer?.name ?? "",
        email: customer?.email ?? "",
        phone: customer?.phone ?? "",
        address: [address?.line1, address?.line2].filter(Boolean).join(", "),
        city: address?.city ?? "",
        zip: address?.postal_code ?? "",
        items: {
          create: items.map((item) => {
            const product = products.find((p) => p.id === item.id)!;
            return { quantity: item.qty, price: product.price, productId: product.id };
          }),
        },
      },
    });
  }

  return NextResponse.json({ received: true });
}
