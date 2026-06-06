import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const body = await req.json() as { items: { productId: number; quantity: number }[] };
  if (!body.items?.length) {
    return NextResponse.json({ error: "No items" }, { status: 400 });
  }

  const productIds = body.items.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, published: true, stock: true },
  });

  if (products.length !== body.items.length) {
    return NextResponse.json({ error: "Some products are unavailable" }, { status: 400 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = body.items.map((item) => {
    const product = products.find((p) => p.id === item.productId)!;
    const images = JSON.parse(product.images) as string[];
    const imageUrls = images[0] ? [`${siteUrl}${images[0]}`] : [];

    return {
      quantity: item.quantity,
      price_data: {
        currency: "pln",
        unit_amount: Math.round(product.price * 100),
        product_data: {
          name: product.name,
          description: product.description.slice(0, 500),
          images: imageUrls,
        },
      },
    };
  });

  const metadata = JSON.stringify(
    body.items.map((i) => ({ id: i.productId, qty: i.quantity }))
  );

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: `${siteUrl}/sklep/sukces?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/sklep`,
    shipping_address_collection: { allowed_countries: ["PL"] },
    phone_number_collection: { enabled: true },
    locale: "pl",
    metadata: { items: metadata },
    payment_method_types: ["card", "blik", "p24"],
  });

  return NextResponse.json({ url: session.url });
}
