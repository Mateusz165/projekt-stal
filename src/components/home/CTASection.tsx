"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, ArrowRight, MessageCircle } from "lucide-react";
import { COMPANY } from "@/lib/utils";

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/schody-rad1.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/95 to-zinc-950/80" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6"
          >
            Bezpłatna wycena
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Zacznijmy
            <br />
            <span className="text-gradient-gold">Twój projekt</span>
            <br />
            dziś
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-300 text-lg mb-10 max-w-xl"
          >
            Skontaktuj się z nami — w ciągu 24 godzin otrzymasz bezpłatną
            wycenę. Doradzimy najlepsze rozwiązanie dla Twojego domu lub firmy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <Link
              href="/kalkulator"
              className="group inline-flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] transition-all duration-200"
            >
              Kalkulator wyceny
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center gap-3 border border-zinc-600 hover:border-zinc-400 text-zinc-200 hover:text-white font-semibold text-base px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200"
            >
              Formularz kontaktowy
            </Link>
          </motion.div>

          {/* Contact options */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-6"
          >
            <a
              href={COMPANY.phoneHref}
              className="flex items-center gap-3 text-zinc-400 hover:text-amber-400 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-800 group-hover:bg-amber-500/10 border border-zinc-700 group-hover:border-amber-500/40 flex items-center justify-center transition-all duration-200">
                <Phone size={16} className="text-zinc-400 group-hover:text-amber-400" />
              </div>
              <div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider">Zadzwoń</div>
                <div className="text-white font-semibold text-sm">{COMPANY.phone}</div>
              </div>
            </a>

            <a
              href={COMPANY.emailHref}
              className="flex items-center gap-3 text-zinc-400 hover:text-amber-400 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-800 group-hover:bg-amber-500/10 border border-zinc-700 group-hover:border-amber-500/40 flex items-center justify-center transition-all duration-200">
                <Mail size={16} className="text-zinc-400 group-hover:text-amber-400" />
              </div>
              <div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider">E-mail</div>
                <div className="text-white font-semibold text-sm">Wyślij wiadomość</div>
              </div>
            </a>

            <a
              href={COMPANY.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-zinc-400 hover:text-amber-400 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-800 group-hover:bg-amber-500/10 border border-zinc-700 group-hover:border-amber-500/40 flex items-center justify-center transition-all duration-200">
                <MessageCircle size={16} className="text-zinc-400 group-hover:text-amber-400" />
              </div>
              <div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider">WhatsApp</div>
                <div className="text-white font-semibold text-sm">Napisz teraz</div>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
