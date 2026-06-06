"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import Link from "next/link";
import { Cookie, X, Check, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CONSENT_KEY = "projekt-stal-cookie-consent";

type Consent = "all" | "necessary" | null;

export default function Analytics() {
  const [consent, setConsent] = useState<Consent>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as Consent | null;
    if (stored) {
      setConsent(stored);
    } else {
      // Short delay so banner doesn't flash before hydration
      const t = setTimeout(() => setShowBanner(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = (level: "all" | "necessary") => {
    localStorage.setItem(CONSENT_KEY, level);
    setConsent(level);
    setShowBanner(false);
  };

  const analyticsEnabled = consent === "all" && !!GA_ID;

  return (
    <>
      {/* Google Analytics — only after explicit consent */}
      {analyticsEnabled && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}

      {/* Cookie consent banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 160 }}
            className="fixed bottom-4 left-4 right-4 z-[60] md:left-auto md:right-6 md:max-w-md"
          >
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 shadow-2xl">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <Cookie size={16} className="text-amber-400" />
                  </div>
                  <h3 className="text-white font-bold text-sm">Ustawienia cookies</h3>
                </div>
                <button
                  onClick={() => accept("necessary")}
                  className="p-1 text-zinc-500 hover:text-zinc-300 transition-colors flex-shrink-0"
                  aria-label="Zamknij (tylko niezbędne)"
                >
                  <X size={16} />
                </button>
              </div>

              <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                Używamy cookies do prawidłowego działania strony (niezbędne) oraz do analizy ruchu
                (analityczne, Google Analytics). Możesz zaakceptować wszystkie lub wybrać tylko
                niezbędne.{" "}
                <Link href="/polityka-prywatnosci" className="text-amber-400 hover:text-amber-300 underline">
                  Polityka prywatności
                </Link>
              </p>

              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mb-4"
                  >
                    <div className="space-y-2 border border-zinc-800 rounded-xl p-3">
                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <p className="text-white font-medium">Niezbędne</p>
                          <p className="text-zinc-500">Sesja, panel admina, koszyk</p>
                        </div>
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <Check size={12} /> Zawsze aktywne
                        </span>
                      </div>
                      <div className="border-t border-zinc-800" />
                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <p className="text-white font-medium">Analityczne</p>
                          <p className="text-zinc-500">Google Analytics (anonimizowany IP)</p>
                        </div>
                        <span className="text-zinc-500 text-xs">Wymagana zgoda</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => accept("all")}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm py-2.5 rounded-xl transition-all"
                >
                  <Check size={14} /> Akceptuj wszystkie
                </button>
                <button
                  onClick={() => accept("necessary")}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium text-sm py-2.5 rounded-xl transition-colors"
                >
                  Tylko niezbędne
                </button>
                <button
                  onClick={() => setShowDetails((v) => !v)}
                  className="sm:w-10 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-500 hover:text-zinc-300 py-2.5 rounded-xl transition-colors"
                  aria-label="Szczegóły"
                >
                  <Settings size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
