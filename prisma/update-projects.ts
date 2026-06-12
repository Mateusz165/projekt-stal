import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

const projects = [
  // SCHODY — featured (pojawi się jako duży kafelek na stronie głównej)
  {
    title: "Schody stalowe Kopisk",
    category: "Schody",
    location: "Kopisk",
    year: 2025,
    images: JSON.stringify(["/images/schody-kopisk1.jpg", "/images/schody-kopisk2.jpg", "/images/schody-kopisk3.jpg"]),
    featured: true,
  },
  {
    title: "Schody z granitem",
    category: "Schody",
    location: "Białystok",
    year: 2025,
    images: JSON.stringify(["/images/schody-i-granit1.jpg", "/images/schody-i-granit2.jpg"]),
    featured: false,
  },
  {
    title: "Schody loftowe Korycin",
    category: "Schody",
    location: "Korycin",
    year: 2024,
    images: JSON.stringify(["/images/schody-korycin1.jpg", "/images/schody-korycin2.jpg"]),
    featured: false,
  },
  {
    title: "Schody stalowe RAD",
    category: "Schody",
    location: "Białystok",
    year: 2024,
    images: JSON.stringify(["/images/schody-rad1.jpg", "/images/schody-rad2.jpg"]),
    featured: false,
  },
  {
    title: "Schody Bielsk Podlaski",
    category: "Schody",
    location: "Bielsk Podlaski",
    year: 2024,
    images: JSON.stringify(["/images/schody-bielsk1.jpg", "/images/schody-bielsk2.jpg"]),
    featured: false,
  },
  {
    title: "Schody Klepacka",
    category: "Schody",
    location: "Białystok",
    year: 2024,
    images: JSON.stringify(["/images/schody-klepacka1.jpg", "/images/schody-klepacka2.jpg"]),
    featured: false,
  },
  {
    title: "Schody Janowicze",
    category: "Schody",
    location: "Janowicze",
    year: 2024,
    images: JSON.stringify(["/images/schody-janowicze1.jpg", "/images/schody-janowicze2.jpg"]),
    featured: false,
  },
  {
    title: "Schody nowoczesne",
    category: "Schody",
    location: "Białystok",
    year: 2024,
    images: JSON.stringify(["/images/schody-j1.jpg", "/images/schody-j2.jpg"]),
    featured: false,
  },
  {
    title: "Schody Kolno",
    category: "Schody",
    location: "Kolno",
    year: 2024,
    images: JSON.stringify(["/images/schody-kolno1.jpg"]),
    featured: false,
  },
  {
    title: "Schody Wulka",
    category: "Schody",
    location: "Wulka",
    year: 2024,
    images: JSON.stringify(["/images/schody-wulka1.jpg"]),
    featured: false,
  },
  // BALUSTRADY — featured
  {
    title: "Balustrada harfa",
    category: "Balustrady",
    location: "Białystok",
    year: 2025,
    images: JSON.stringify(["/images/balustrada-harfa1.jpg", "/images/balustrada-harfa2.jpg"]),
    featured: true,
  },
  {
    title: "Balustrada czarna Niecki",
    category: "Balustrady",
    location: "Białystok",
    year: 2024,
    images: JSON.stringify(["/images/balustrada-niecki1.jpg", "/images/balustrada-niecki2.jpg"]),
    featured: false,
  },
  {
    title: "Balustrada złota",
    category: "Balustrady",
    location: "Białystok",
    year: 2024,
    images: JSON.stringify(["/images/balustrada-na-zloto1.jpg", "/images/balustrada-na-zloto2.jpg"]),
    featured: false,
  },
  {
    title: "Balustrady Siemiatycze",
    category: "Balustrady",
    location: "Siemiatycze",
    year: 2024,
    images: JSON.stringify(["/images/balustrady-siemiatycze1.jpg", "/images/balustrady-siemiatycze2.jpg"]),
    featured: false,
  },
  {
    title: "Balustrada Jurowce",
    category: "Balustrady",
    location: "Jurowce",
    year: 2024,
    images: JSON.stringify(["/images/balustrada-jurowce1.jpg", "/images/balustrada-jurowce2.jpg"]),
    featured: false,
  },
  {
    title: "Balustrada Podleńce",
    category: "Balustrady",
    location: "Podleńce",
    year: 2025,
    images: JSON.stringify(["/images/balustrada-podlence1.jpg", "/images/balustrada-podlence2.jpg"]),
    featured: false,
  },
  {
    title: "Balustrada i schody Dobrzyniewo",
    category: "Balustrady",
    location: "Dobrzyniewo",
    year: 2024,
    images: JSON.stringify(["/images/balustrada-schody-dobrzyniewo1.jpg", "/images/balustrada-schody-dobrzyniewo2.jpg"]),
    featured: false,
  },
  {
    title: "Balustrada Halickie",
    category: "Balustrady",
    location: "Białystok",
    year: 2024,
    images: JSON.stringify(["/images/balustrada-halickie1.jpg"]),
    featured: false,
  },
  {
    title: "Poręcze stalowe",
    category: "Balustrady",
    location: "Białystok",
    year: 2024,
    images: JSON.stringify(["/images/porece1.jpg"]),
    featured: false,
  },
  // BRAMY
  {
    title: "Brama wjazdowa Nowodworce",
    category: "Bramy",
    location: "Nowodworce",
    year: 2025,
    images: JSON.stringify(["/images/brama-nowodworce1.jpg", "/images/brama-nowodworce2.jpg", "/images/brama-nowodworce3.jpg"]),
    featured: false,
  },
  // GARAŻE
  {
    title: "Garaż stalowy Wiedeńska",
    category: "Garaże",
    location: "Białystok",
    year: 2024,
    images: JSON.stringify(["/images/garaz-wiedenska1.jpg", "/images/garaz-wiedenska2.jpg"]),
    featured: false,
  },
  // OGRODZENIA
  {
    title: "Ogrodzenie panelowe Dobrzyniewo",
    category: "Ogrodzenia",
    location: "Dobrzyniewo",
    year: 2024,
    images: JSON.stringify(["/images/ogrodzenie-dobrzyniewo1.jpg", "/images/ogrodzenie-dobrzyniewo2.jpg"]),
    featured: false,
  },
  // INNE
  {
    title: "Ścianka loftowa stalowa",
    category: "Inne",
    location: "Białystok",
    year: 2024,
    images: JSON.stringify(["/images/scianka-loft1.jpg", "/images/scianka-loft2.jpg"]),
    featured: false,
  },
  {
    title: "Regał przemysłowy z dębem",
    category: "Inne",
    location: "Białystok",
    year: 2024,
    images: JSON.stringify(["/images/regal-i-dab1.jpg"]),
    featured: false,
  },
  {
    title: "Stół i ława stalowa",
    category: "Inne",
    location: "Białystok",
    year: 2024,
    images: JSON.stringify(["/images/stol-lawa1.jpg"]),
    featured: false,
  },
];

async function main() {
  console.log("Usuwanie starych realizacji...");
  const deleted = await prisma.project.deleteMany({});
  console.log(`✓ Usunięto ${deleted.count} rekordów`);

  console.log("Dodawanie nowych realizacji...");
  for (const p of projects) {
    await prisma.project.create({ data: p });
  }
  console.log(`✓ Dodano ${projects.length} realizacji`);
  console.log("✅ Gotowe!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
