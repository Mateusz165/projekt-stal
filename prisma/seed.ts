import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma";
import bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

async function main() {
  console.log("Seeding database...");

  // Admin user
  const passwordHash = await bcrypt.hash("admin123", 12);
  await prisma.adminUser.upsert({
    where: { email: "admin@projekt-stal.pl" },
    update: {},
    create: {
      email: "admin@projekt-stal.pl",
      password: passwordHash,
      name: "Administrator",
      role: "admin",
    },
  });
  console.log("✓ Admin user: admin@projekt-stal.pl / admin123");

  // Products
  const products = [
    {
      slug: "slupek-balustradowy-40x40",
      name: "Słupek balustradowy kwadratowy 40×40",
      description: "Stal ocynkowana, profil 40×40mm, wysokość 90cm. Do montażu balustrad wewnętrznych i zewnętrznych.",
      price: 89,
      oldPrice: 109,
      category: "balustrady",
      badge: "Bestseller",
      images: JSON.stringify(["https://images.unsplash.com/photo-1558618047-3c8c76ca2478?w=400&q=80"]),
      rating: 4.9,
      reviewCount: 47,
    },
    {
      slug: "porecz-nierdzewna-d42",
      name: "Poręcz ze stali nierdzewnej Ø42,5mm",
      description: "Rura nierdzewna AISI 304, cena za 1 mb. Polerowana, gotowa do montażu.",
      price: 145,
      category: "balustrady",
      images: JSON.stringify(["https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&q=80"]),
      rating: 4.8,
      reviewCount: 32,
    },
    {
      slug: "stopien-schodowy-dab-40mm",
      name: "Stopień schodowy dąb 40mm",
      description: "Drewno dębowe lite, 40mm grubości. Wymiar standardowy 100×25cm.",
      price: 290,
      category: "schody",
      badge: "Nowy",
      images: JSON.stringify(["https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=400&q=80"]),
      rating: 5.0,
      reviewCount: 28,
    },
    {
      slug: "uchwyt-szklany-punktowy",
      name: "Uchwyt szklany punktowy nierdzewny",
      description: "Uchwyt SATIN do szkła 8-10mm. Komplet 4 szt. Stal nierdzewna AISI 304.",
      price: 65,
      category: "balustrady",
      images: JSON.stringify(["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"]),
      rating: 4.7,
      reviewCount: 56,
    },
    {
      slug: "profile-ogrodzeniowe-10m",
      name: "Profile ogrodzeniowe — zestaw 10m",
      description: "Profil zamknięty 40×20mm, stal ocynkowana. Komplet 10 metrów bieżących.",
      price: 480,
      oldPrice: 560,
      category: "ogrodzenia",
      images: JSON.stringify(["https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=400&q=80"]),
      rating: 4.6,
      reviewCount: 19,
    },
    {
      slug: "kotwa-rozporowa-m12-50szt",
      name: "Kotwa rozporowa M12 do betonu (50 szt.)",
      description: "Kotwy stalowe ocynkowane, gwint M12×130mm. Do montażu konstrukcji stalowych.",
      price: 95,
      category: "akcesoria",
      badge: "Promocja",
      images: JSON.stringify(["https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&q=80"]),
      rating: 4.9,
      reviewCount: 84,
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }
  console.log(`✓ ${products.length} products`);

  // Projects / Realizations
  const projects = [
    { title: "Schody loftowe z dębem", category: "Schody", location: "Białystok", year: 2024, images: JSON.stringify(["https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&q=80"]), featured: true },
    { title: "Balustrada szklana", category: "Balustrady", location: "Warszawa", year: 2024, images: JSON.stringify(["https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80"]), featured: false },
    { title: "Ogrodzenie nowoczesne", category: "Ogrodzenia", location: "Łomża", year: 2023, images: JSON.stringify(["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"]), featured: false },
    { title: "Taras stalowy", category: "Tarasy", location: "Białystok", year: 2024, images: JSON.stringify(["https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80"]), featured: true },
    { title: "Brama przesuwna automatyczna", category: "Bramy", location: "Białystok", year: 2024, images: JSON.stringify(["https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=800&q=80"]), featured: false },
    { title: "Schody wspornikowe", category: "Schody", location: "Gdańsk", year: 2023, images: JSON.stringify(["https://images.unsplash.com/photo-1600607687939-ce8a6d8fbe5e?w=800&q=80"]), featured: false },
  ];
  for (const proj of projects) {
    await prisma.project.create({ data: proj }).catch(() => {});
  }
  console.log(`✓ ${projects.length} projects`);

  // Testimonials
  const testimonials = [
    { name: "Tomasz Kowalski", location: "Białystok", rating: 5, text: "Zamówiłem schody wspornikowe z dębowymi stopniami. Efekt przeszedł moje oczekiwania — perfekcyjne wykonanie!", project: "Schody wspornikowe" },
    { name: "Anna Wiśniewska", location: "Warszawa", rating: 5, text: "Balustrada szklana na schodach wygląda przepięknie. Pan Mateusz bardzo pomocny, doradził najlepsze rozwiązanie.", project: "Balustrada szklana" },
    { name: "Marek Lewandowski", location: "Łomża", rating: 5, text: "Ogrodzenie panelowe z automatyczną bramą — wszystko wykonane na najwyższym poziomie. Polecam!", project: "Ogrodzenie + brama" },
  ];
  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t }).catch(() => {});
  }
  console.log(`✓ ${testimonials.length} testimonials`);

  // Sample blog post
  await prisma.blogPost.upsert({
    where: { slug: "schody-loftowe-drewno-i-stal" },
    update: {},
    create: {
      slug: "schody-loftowe-drewno-i-stal",
      title: "Schody loftowe — połączenie drewna i stali w nowoczesnym domu",
      excerpt: "Dowiedz się, jak zaprojektować idealne schody loftowe, które będą zarówno funkcjonalne jak i estetyczne.",
      content: "Schody loftowe to jeden z najbardziej rozpoznawalnych elementów nowoczesnych wnętrz industrialnych...",
      category: "Schody loftowe",
      image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1200&q=80",
      published: true,
      publishedAt: new Date(),
    },
  });
  console.log("✓ 1 blog post");

  await prisma.quoteRequest.create({
    data: {
      type: "schody",
      width: "1.2",
      height: "2.8",
      location: "Białystok",
      description: "Schody loftowe, drewno dębowe, kolor czarny mat",
      name: "Jan Testowy",
      phone: "500 000 001",
      email: "test@example.com",
      status: "new",
    },
  }).catch(() => {});

  await prisma.contactMessage.create({
    data: {
      name: "Anna Przykładowa",
      email: "anna@example.com",
      phone: "600 000 002",
      subject: "Pytanie o balustradę",
      message: "Dzień dobry, chciałabym zapytać o balustradę szklaną do schodów zewnętrznych.",
      read: false,
    },
  }).catch(() => {});

  console.log("✓ Sample quote request & contact message");
  console.log("\n✅ Seed complete! Login: admin@projekt-stal.pl / admin123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
