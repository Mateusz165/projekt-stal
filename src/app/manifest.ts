import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Projekt-Stal Mateusz Partyka",
    short_name: "Projekt-Stal",
    description: "Schody stalowe, balustrady, ogrodzenia i bramy na wymiar – Białystok",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    orientation: "portrait-primary",
    categories: ["business", "shopping"],
    lang: "pl",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Realizacje", url: "/realizacje", description: "Galeria realizacji" },
      { name: "Wycena", url: "/kalkulator", description: "Kalkulator wyceny" },
      { name: "Kontakt", url: "/kontakt", description: "Formularz kontaktowy" },
    ],
  };
}
