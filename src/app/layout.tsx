import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Analytics from "@/components/Analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://projekt-stal.pl"),
  title: {
    default: "Projekt-Stal Mateusz Partyka | Schody stalowe, balustrady, ogrodzenia – Białystok",
    template: "%s | Projekt-Stal Białystok",
  },
  description:
    "Projekt-Stal Mateusz Partyka – profesjonalne wykonanie schodów stalowych, loftowych, balustrad, ogrodzeń, bram i zadaszeń. Realizacje na terenie całej Polski. Zadzwoń: 664 757 520",
  keywords: [
    "schody stalowe Białystok",
    "schody loftowe",
    "balustrady stalowe",
    "ogrodzenia metalowe",
    "bramy garażowe",
    "konstrukcje stalowe",
    "zadaszenia stalowe",
    "tarasy stalowe",
    "Projekt-Stal",
    "Mateusz Partyka",
  ],
  authors: [{ name: "Projekt-Stal Mateusz Partyka" }],
  creator: "Projekt-Stal Mateusz Partyka",
  publisher: "Projekt-Stal Mateusz Partyka",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://projekt-stal.pl",
    siteName: "Projekt-Stal Mateusz Partyka",
    title: "Projekt-Stal | Nowoczesne konstrukcje stalowe – Białystok",
    description:
      "Schody stalowe, balustrady, ogrodzenia, bramy i zadaszenia na zamówienie. Premium jakość, nowoczesny design.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Projekt-Stal – Nowoczesne konstrukcje stalowe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projekt-Stal | Nowoczesne konstrukcje stalowe",
    description: "Schody stalowe, balustrady, ogrodzenia, bramy na zamówienie.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://projekt-stal.pl",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://projekt-stal.pl/#business",
      name: "Projekt-Stal Mateusz Partyka",
      description: "Profesjonalne wykonanie schodów stalowych, balustrad, ogrodzeń, bram i zadaszeń na zamówienie.",
      url: "https://projekt-stal.pl",
      telephone: "+48664757520",
      email: "projekt.stalbialystok@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Białystok",
        addressRegion: "Podlaskie",
        addressCountry: "PL",
      },
      geo: { "@type": "GeoCoordinates", latitude: 53.1325, longitude: 23.1688 },
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "17:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "09:00", closes: "14:00" },
      ],
      priceRange: "$$",
      image: "https://projekt-stal.pl/og-image.jpg",
      sameAs: ["https://www.facebook.com/projektstal", "https://www.instagram.com/projektstal"],
    },
    {
      "@type": "WebSite",
      "@id": "https://projekt-stal.pl/#website",
      url: "https://projekt-stal.pl",
      name: "Projekt-Stal Mateusz Partyka",
      publisher: { "@id": "https://projekt-stal.pl/#business" },
      potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: "https://projekt-stal.pl/realizacje?q={search_term_string}" }, "query-input": "required name=search_term_string" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${inter.variable} ${outfit.variable} scroll-smooth`}
    >
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="bg-steel-900 text-steel-50 min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
