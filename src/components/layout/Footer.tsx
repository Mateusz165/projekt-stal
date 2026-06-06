import Link from "next/link";
import { Phone, Mail, MapPin, Share2 } from "lucide-react";
import { COMPANY } from "@/lib/utils";

const offerLinks = [
  { label: "Schody stalowe", href: "/oferta/schody" },
  { label: "Balustrady", href: "/oferta/balustrady" },
  { label: "Ogrodzenia", href: "/oferta/ogrodzenia" },
  { label: "Bramy", href: "/oferta/bramy" },
  { label: "Tarasy i zadaszenia", href: "/oferta/tarasy" },
  { label: "Garaże stalowe", href: "/oferta/garaze" },
  { label: "Konstrukcje na wymiar", href: "/oferta/konstrukcje" },
];

const companyLinks = [
  { label: "O firmie", href: "/o-firmie" },
  { label: "Realizacje", href: "/realizacje" },
  { label: "Sklep", href: "/sklep" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Kalkulator wyceny", href: "/kalkulator" },
];

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/50">
      {/* CTA Strip */}
      <div className="bg-amber-500 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-950 font-bold text-lg text-center">
            Gotowy na wycenę? Zadzwoń teraz — odpowiadamy szybko!
          </p>
          <a
            href={COMPANY.phoneHref}
            className="bg-zinc-950 text-amber-400 font-bold px-6 py-2 rounded-lg hover:bg-zinc-800 transition-colors whitespace-nowrap"
          >
            {COMPANY.phone}
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="space-y-5">
          <div>
            <div
              className="text-white font-black text-xl tracking-wide"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              PROJEKT-STAL
            </div>
            <div className="text-amber-400 text-xs tracking-[0.2em] uppercase mt-1">
              Mateusz Partyka
            </div>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Tworzymy nowoczesne konstrukcje stalowe na lata. Schody, balustrady,
            ogrodzenia, bramy i zadaszenia premium.
          </p>
          <div className="flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-amber-500 hover:text-zinc-950 transition-all duration-200"
              aria-label="Facebook"
            >
              <Share2 size={16} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-amber-500 hover:text-zinc-950 transition-all duration-200"
              aria-label="Instagram"
            >
              <Share2 size={16} />
            </a>
          </div>
        </div>

        {/* Offer */}
        <div>
          <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-5 pb-3 border-b border-zinc-800">
            Oferta
          </h4>
          <ul className="space-y-2">
            {offerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-zinc-400 text-sm hover:text-amber-400 transition-colors duration-150 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-5 pb-3 border-b border-zinc-800">
            Firma
          </h4>
          <ul className="space-y-2">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-zinc-400 text-sm hover:text-amber-400 transition-colors duration-150 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-5 pb-3 border-b border-zinc-800">
            Kontakt
          </h4>
          <ul className="space-y-4">
            <li>
              <a
                href={COMPANY.phoneHref}
                className="flex items-start gap-3 text-zinc-400 hover:text-amber-400 transition-colors group"
              >
                <Phone
                  size={16}
                  className="mt-0.5 shrink-0 text-amber-500 group-hover:text-amber-400"
                />
                <div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">
                    Telefon
                  </div>
                  <div className="text-sm font-medium">{COMPANY.phone}</div>
                </div>
              </a>
            </li>
            <li>
              <a
                href={COMPANY.emailHref}
                className="flex items-start gap-3 text-zinc-400 hover:text-amber-400 transition-colors group"
              >
                <Mail
                  size={16}
                  className="mt-0.5 shrink-0 text-amber-500 group-hover:text-amber-400"
                />
                <div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">
                    E-mail
                  </div>
                  <div className="text-sm font-medium break-all">
                    {COMPANY.email}
                  </div>
                </div>
              </a>
            </li>
            <li>
              <div className="flex items-start gap-3 text-zinc-400">
                <MapPin
                  size={16}
                  className="mt-0.5 shrink-0 text-amber-500"
                />
                <div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">
                    Lokalizacja
                  </div>
                  <div className="text-sm font-medium">{COMPANY.address}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800/50 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-500 text-xs">
            © {new Date().getFullYear()} {COMPANY.name}. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex gap-4">
            <Link
              href="/polityka-prywatnosci"
              className="text-zinc-500 hover:text-zinc-300 text-xs transition-colors"
            >
              Polityka prywatności
            </Link>
            <Link
              href="/regulamin"
              className="text-zinc-500 hover:text-zinc-300 text-xs transition-colors"
            >
              Regulamin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
