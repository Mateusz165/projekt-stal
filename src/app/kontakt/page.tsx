"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle, Clock } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { COMPANY } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Podaj imię i nazwisko"),
  email: z.string().email("Podaj prawidłowy e-mail"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Podaj temat wiadomości"),
  message: z.string().min(10, "Wiadomość musi mieć co najmniej 10 znaków"),
});

type FormData = z.infer<typeof schema>;

const contactMethods = [
  {
    icon: Phone,
    title: "Telefon",
    value: COMPANY.phone,
    href: COMPANY.phoneHref,
    desc: "Dostępni pn–pt 8:00–18:00",
  },
  {
    icon: Mail,
    title: "E-mail",
    value: COMPANY.email,
    href: COMPANY.emailHref,
    desc: "Odpowiadamy w ciągu 24h",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "Napisz wiadomość",
    href: COMPANY.whatsapp,
    desc: "Szybki kontakt przez WhatsApp",
    external: true,
  },
  {
    icon: MapPin,
    title: "Lokalizacja",
    value: COMPANY.address,
    href: "#mapa",
    desc: "Realizujemy w całej Polsce",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4">
              <span className="h-px w-8 bg-amber-400/60" />
              Kontakt
            </div>
            <h1
              className="text-5xl sm:text-6xl font-black text-white mb-5 max-w-2xl leading-tight"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Porozmawiajmy
              <br />
              <span className="text-gradient-gold">o Twoim projekcie</span>
            </h1>
            <p className="text-zinc-300 text-xl max-w-xl leading-relaxed">
              Skontaktuj się z nami dowolną metodą — odpowiadamy szybko i chętnie
              doradzimy najlepsze rozwiązanie.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-12 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactMethods.map((method, i) => {
              const Icon = method.icon;
              return (
                <AnimatedSection key={method.title} delay={i * 0.1}>
                  <a
                    href={method.href}
                    target={method.external ? "_blank" : undefined}
                    rel={method.external ? "noopener noreferrer" : undefined}
                    className="block bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 rounded-2xl p-6 transition-all duration-300 group hover-lift"
                  >
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                      <Icon size={22} className="text-amber-400" />
                    </div>
                    <h3 className="text-zinc-400 text-xs uppercase tracking-wider mb-1">
                      {method.title}
                    </h3>
                    <p className="text-white font-semibold text-sm mb-1">
                      {method.value}
                    </p>
                    <p className="text-zinc-500 text-xs">{method.desc}</p>
                  </a>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-12 pb-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Form */}
            <AnimatedSection direction="left">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <h2
                  className="text-2xl font-black text-white mb-6"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  Wyślij wiadomość
                </h2>
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-10"
                    >
                      <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle size={28} className="text-amber-400" />
                      </div>
                      <h3 className="text-white font-bold text-xl mb-2">
                        Wiadomość wysłana!
                      </h3>
                      <p className="text-zinc-400">
                        Odpiszemy w ciągu 24 godzin roboczych.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-zinc-400 text-sm font-medium mb-2">
                            Imię i nazwisko *
                          </label>
                          <input
                            type="text"
                            placeholder="Jan Kowalski"
                            className={`w-full bg-zinc-800 border rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm ${
                              errors.name ? "border-red-500" : "border-zinc-700 focus:border-amber-500"
                            }`}
                            {...register("name")}
                          />
                          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                          <label className="block text-zinc-400 text-sm font-medium mb-2">
                            Telefon
                          </label>
                          <input
                            type="tel"
                            placeholder="500 000 000"
                            className="w-full bg-zinc-800 border border-zinc-700 focus:border-amber-500 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm"
                            {...register("phone")}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-zinc-400 text-sm font-medium mb-2">
                          E-mail *
                        </label>
                        <input
                          type="email"
                          placeholder="jan@example.pl"
                          className={`w-full bg-zinc-800 border rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm ${
                            errors.email ? "border-red-500" : "border-zinc-700 focus:border-amber-500"
                          }`}
                          {...register("email")}
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label className="block text-zinc-400 text-sm font-medium mb-2">
                          Temat *
                        </label>
                        <input
                          type="text"
                          placeholder="np. Zapytanie o schody loftowe"
                          className={`w-full bg-zinc-800 border rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm ${
                            errors.subject ? "border-red-500" : "border-zinc-700 focus:border-amber-500"
                          }`}
                          {...register("subject")}
                        />
                        {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
                      </div>
                      <div>
                        <label className="block text-zinc-400 text-sm font-medium mb-2">
                          Wiadomość *
                        </label>
                        <textarea
                          rows={5}
                          placeholder="Opisz swój projekt, podaj wymiary lub pytania..."
                          className={`w-full bg-zinc-800 border rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none text-sm ${
                            errors.message ? "border-red-500" : "border-zinc-700 focus:border-amber-500"
                          }`}
                          {...register("message")}
                        />
                        {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-70 text-zinc-950 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.01]"
                      >
                        {loading ? (
                          <div className="w-5 h-5 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send size={16} />
                            Wyślij wiadomość
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>

            {/* Map + Info */}
            <AnimatedSection direction="right" delay={0.1}>
              <div className="space-y-6">
                {/* Map placeholder */}
                <div id="mapa" className="rounded-2xl overflow-hidden h-72 bg-zinc-900 border border-zinc-800 relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d74474.23576870396!2d23.07697!3d53.13248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ffc0ac3c95921%3A0xbfe5e9af8a18dfcb!2sBia%C5%82ystok!5e0!3m2!1spl!2spl!4v1700000000000!5m2!1spl!2spl"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale"
                  />
                </div>

                {/* Hours */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock size={20} className="text-amber-400" />
                    <h3 className="text-white font-bold">Godziny pracy</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    {[
                      { day: "Poniedziałek – Piątek", hours: "8:00 – 18:00" },
                      { day: "Sobota", hours: "9:00 – 14:00" },
                      { day: "Niedziela", hours: "Nieczynne" },
                    ].map((item) => (
                      <div key={item.day} className="flex justify-between">
                        <span className="text-zinc-400">{item.day}</span>
                        <span className={item.hours === "Nieczynne" ? "text-zinc-600" : "text-white font-medium"}>
                          {item.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick actions */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={COMPANY.phoneHref}
                    className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-3 rounded-xl transition-all"
                  >
                    <Phone size={16} />
                    Zadzwoń
                  </a>
                  <a
                    href={COMPANY.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 border border-zinc-700 hover:border-amber-500 text-zinc-300 hover:text-amber-400 font-semibold py-3 rounded-xl transition-all"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
