import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency = "PLN"): string {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export const COMPANY = {
  name: "Projekt-Stal Mateusz Partyka",
  shortName: "Projekt-Stal",
  phone: "664 757 520",
  phoneHref: "tel:+48664757520",
  email: "projekt.stalbialystok@gmail.com",
  emailHref: "mailto:projekt.stalbialystok@gmail.com",
  whatsapp: "https://wa.me/48664757520",
  city: "Białystok",
  address: "Białystok, Polska",
  nip: "000-000-00-00",
};
