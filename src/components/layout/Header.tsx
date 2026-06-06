"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { COMPANY, cn } from "@/lib/utils";

const navLinks = [
  { label: "Strona główna", href: "/" },
  { label: "O firmie", href: "/o-firmie" },
  {
    label: "Oferta",
    href: "/oferta",
    children: [
      { label: "Schody stalowe", href: "/oferta/schody" },
      { label: "Balustrady", href: "/oferta/balustrady" },
      { label: "Ogrodzenia", href: "/oferta/ogrodzenia" },
      { label: "Bramy", href: "/oferta/bramy" },
      { label: "Tarasy i zadaszenia", href: "/oferta/tarasy" },
      { label: "Garaże stalowe", href: "/oferta/garaze" },
      { label: "Konstrukcje na wymiar", href: "/oferta/konstrukcje" },
    ],
  },
  { label: "Realizacje", href: "/realizacje" },
  { label: "Sklep", href: "/sklep" },
  { label: "Blog", href: "/blog" },
  { label: "Opinie", href: "/opinie" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-zinc-950/95 backdrop-blur-md shadow-2xl shadow-black/50 py-2"
            : "bg-transparent py-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-amber-500 rotate-45 rounded-sm group-hover:rotate-90 transition-transform duration-500" />
                <span className="absolute inset-0 flex items-center justify-center text-zinc-950 font-black text-sm z-10">
                  PS
                </span>
              </div>
              <div className="hidden sm:block">
                <div className="text-white font-bold text-lg leading-tight tracking-wide" style={{ fontFamily: "var(--font-outfit)" }}>
                  PROJEKT-STAL
                </div>
                <div className="text-amber-400 text-xs tracking-[0.2em] uppercase">
                  Mateusz Partyka
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(link.href)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200",
                        pathname.startsWith(link.href) && pathname !== "/"
                          ? "text-amber-400"
                          : "text-zinc-300 hover:text-white"
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform duration-200",
                          activeDropdown === link.href ? "rotate-180" : ""
                        )}
                      />
                    </Link>
                    <AnimatePresence>
                      {activeDropdown === link.href && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-56 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl shadow-black/60 overflow-hidden"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-3 text-sm text-zinc-300 hover:text-amber-400 hover:bg-zinc-800 transition-colors duration-150 border-b border-zinc-800/50 last:border-0"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200",
                      pathname === link.href
                        ? "text-amber-400"
                        : "text-zinc-300 hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* CTA + Mobile */}
            <div className="flex items-center gap-3">
              <a
                href={COMPANY.phoneHref}
                className="hidden md:flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
              >
                <Phone size={15} />
                <span>{COMPANY.phone}</span>
              </a>
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 text-zinc-300 hover:text-white transition-colors"
                aria-label="Otwórz menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-zinc-950 border-l border-zinc-800 overflow-y-auto"
            >
              <div className="flex items-center justify-between p-5 border-b border-zinc-800">
                <span className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-outfit)" }}>
                  PROJEKT-STAL
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="p-5 space-y-1">
                {navLinks.map((link) => (
                  <div key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                        pathname === link.href
                          ? "bg-amber-500/10 text-amber-400"
                          : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                      )}
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <div className="ml-4 mt-1 space-y-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 text-xs text-zinc-400 hover:text-amber-400 transition-colors"
                          >
                            → {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              <div className="p-5 border-t border-zinc-800 space-y-3">
                <a
                  href={COMPANY.phoneHref}
                  className="flex items-center justify-center gap-2 bg-amber-500 text-zinc-950 font-bold py-3 rounded-lg w-full"
                >
                  <Phone size={16} />
                  {COMPANY.phone}
                </a>
                <a
                  href={COMPANY.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-zinc-700 text-zinc-300 py-3 rounded-lg w-full text-sm hover:border-amber-500 hover:text-amber-400 transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
