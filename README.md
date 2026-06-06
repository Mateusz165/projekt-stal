# Projekt-Stal — Mateusz Partyka

Strona firmowa dla firmy metalurgicznej z Białegostoku. Schody stalowe, balustrady, ogrodzenia, bramy na wymiar.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **Tailwind CSS v4** + **Framer Motion**
- **Prisma v7** + **PostgreSQL** (Neon)
- **Stripe** — płatności BLIK / Przelewy24 / karta
- **Vercel Blob** — przechowywanie zdjęć
- **Nodemailer** — formularze kontaktowe

## Uruchomienie lokalne

```bash
npm install --legacy-peer-deps

# Skopiuj plik z env i wypełnij wartości
cp .env.example .env

# Wygeneruj klienta Prisma i utwórz tabele
npx prisma generate
npm run db:push

# (opcjonalnie) Seed bazy danych
npx tsx prisma/seed.ts

npm run dev
```

## Zmienne środowiskowe

Patrz `.env.example`.

## Skrypty

| Komenda | Opis |
|---|---|
| `npm run dev` | Dev server (localhost:3000) |
| `npm run build` | Produkcyjny build |
| `npm run db:push` | Synchronizacja schematu z bazą |
| `npm run db:migrate` | Uruchomienie migracji |

## Struktura

```
src/
  app/
    (public pages)         — /, /o-firmie, /oferta/*, /realizacje, /sklep, /blog, /kontakt
    admin/(protected)/     — panel admina (auth cookie)
    api/                   — REST endpoints + Stripe webhook
  components/
    layout/                — Header, Footer
    home/                  — sekcje strony głównej
    admin/                 — ImageUploader, AdminTable
    shop/                  — CartDrawer
  hooks/useCart.ts         — koszyk (localStorage)
  lib/                     — prisma, auth, email, utils
prisma/
  schema.prisma
  seed.ts
```

## Deploy (Vercel + Neon)

1. Utwórz bazę na [neon.tech](https://neon.tech) i skopiuj Connection String
2. Wypchnij kod na GitHub
3. Importuj projekt na [vercel.com](https://vercel.com)
4. Ustaw wszystkie zmienne z `.env.example` w Vercel → Settings → Environment Variables
5. Po pierwszym deployu: skonfiguruj Stripe Webhook na `https://twoja-domena.pl/api/webhooks/stripe`
