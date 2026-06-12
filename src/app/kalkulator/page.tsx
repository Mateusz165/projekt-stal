"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, ChevronDown } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { COMPANY } from "@/lib/utils";
import StairShapePicker, {
  type StairShapeId,
  STAIR_SHAPES,
} from "@/components/kalkulator/StairShapePicker";

const schema = z.object({
  type: z.string().min(1, "Wybierz rodzaj realizacji"),
  width: z.string().min(1, "Podaj szerokość"),
  height: z.string().min(1, "Podaj wysokość"),
  length: z.string().optional(),
  location: z.string().min(3, "Podaj lokalizację"),
  description: z.string().optional(),
  name: z.string().min(2, "Podaj imię i nazwisko"),
  phone: z.string().min(9, "Podaj numer telefonu"),
  email: z.string().email("Podaj prawidłowy e-mail"),
});

type FormData = z.infer<typeof schema>;

const realizationTypes = [
  { value: "schody",     label: "Schody stalowe / loftowe" },
  { value: "balustrady", label: "Balustrady" },
  { value: "ogrodzenie", label: "Ogrodzenie" },
  { value: "brama",      label: "Brama garażowa / wjazdowa" },
  { value: "taras",      label: "Taras stalowy" },
  { value: "zadaszenie", label: "Zadaszenie" },
  { value: "garaz",      label: "Garaż stalowy" },
  { value: "inne",       label: "Inne / Konstrukcja na wymiar" },
];

// base price per m² (PLN), shape multipliers applied on top
const BASE_PRICE_PER_M2 = 950;

function calcEstimate(
  width: string,
  height: string,
  shapeMultiplier: number,
): { low: number; high: number } | null {
  const w = parseFloat(width);
  const h = parseFloat(height);
  if (!w || !h || w <= 0 || h <= 0) return null;
  const area = w * h;
  const mid = area * BASE_PRICE_PER_M2 * shapeMultiplier;
  return {
    low:  Math.round((mid * 0.85) / 100) * 100,
    high: Math.round((mid * 1.15) / 100) * 100,
  };
}

export default function CalculatorPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stairShape, setStairShape] = useState<StairShapeId | null>(null);
  const [shapeError, setShapeError] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const selectedType = watch("type");
  const widthVal     = watch("width");
  const heightVal    = watch("height");
  const isSchody     = selectedType === "schody";

  const shapeMultiplier =
    isSchody && stairShape
      ? (STAIR_SHAPES.find((s) => s.id === stairShape)?.multiplier ?? 1)
      : 1;

  const estimate =
    isSchody && stairShape
      ? calcEstimate(widthVal, heightVal, shapeMultiplier)
      : null;

  const onSubmit = async (data: FormData) => {
    if (isSchody && !stairShape) {
      setShapeError(true);
      document
        .getElementById("stair-shape-section")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setLoading(true);
    try {
      const shapeLabel =
        isSchody && stairShape
          ? STAIR_SHAPES.find((s) => s.id === stairShape)?.label
          : null;

      const description = [
        shapeLabel ? `Kształt schodów: ${shapeLabel}` : null,
        data.description,
      ]
        .filter(Boolean)
        .join("\n");

      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, description }),
      });
      if (!res.ok) throw new Error("Server error");
      setSubmitted(true);
    } catch {
      alert("Wystąpił błąd. Spróbuj ponownie lub zadzwoń bezpośrednio.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4">
              <span className="h-px w-8 bg-amber-400/60" />
              Wycena online
              <span className="h-px w-8 bg-amber-400/60" />
            </div>
            <h1
              className="text-5xl sm:text-6xl font-black text-white mb-5 leading-tight"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Kalkulator
              <br />
              <span className="text-gradient-gold">bezpłatnej wyceny</span>
            </h1>
            <p className="text-zinc-300 text-xl max-w-xl mx-auto leading-relaxed">
              Wypełnij formularz — w ciągu 24 godzin wyślemy Ci wycenę na e-mail
              lub zadzwonimy. Całkowicie bezpłatnie i bez zobowiązań.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Form */}
      <section className="pb-24 bg-zinc-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={36} className="text-amber-400" />
                </div>
                <h2
                  className="text-3xl font-black text-white mb-4"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  Zapytanie wysłane!
                </h2>
                <p className="text-zinc-300 text-lg mb-6">
                  Dziękujemy za przesłanie zapytania. Skontaktujemy się z Tobą
                  w ciągu 24 godzin.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={COMPANY.phoneHref}
                    className="inline-flex items-center justify-center gap-2 bg-amber-500 text-zinc-950 font-bold px-6 py-3 rounded-xl"
                  >
                    Zadzwoń teraz: {COMPANY.phone}
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setStairShape(null);
                    }}
                    className="inline-flex items-center justify-center border border-zinc-700 text-zinc-300 px-6 py-3 rounded-xl hover:border-zinc-500 transition-colors"
                  >
                    Nowe zapytanie
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* ── Step 1: Type ── */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8">
                  <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-sm font-bold shrink-0">
                      1
                    </span>
                    Rodzaj realizacji
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {realizationTypes.map((type) => (
                      <label
                        key={type.value}
                        className={`relative cursor-pointer rounded-xl border p-3 text-center transition-all duration-200 ${
                          selectedType === type.value
                            ? "border-amber-500 bg-amber-500/10 text-amber-400"
                            : "border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
                        }`}
                      >
                        <input
                          type="radio"
                          value={type.value}
                          className="sr-only"
                          {...register("type")}
                        />
                        <span className="text-xs font-medium">{type.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.type && (
                    <p className="text-red-400 text-sm mt-2">
                      {errors.type.message}
                    </p>
                  )}
                </div>

                {/* ── Step 1b: Stair shape (schody only) ── */}
                <AnimatePresence>
                  {isSchody && (
                    <motion.div
                      id="stair-shape-section"
                      key="stair-shape"
                      initial={{ opacity: 0, y: -12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.25 }}
                      className={`bg-zinc-900 border rounded-2xl p-6 sm:p-8 transition-colors ${
                        shapeError
                          ? "border-red-500/60"
                          : "border-zinc-800"
                      }`}
                    >
                      <h2 className="text-white font-bold text-xl mb-2 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-sm font-bold shrink-0">
                          2
                        </span>
                        Kształt schodów
                      </h2>
                      <p className="text-zinc-500 text-sm mb-6 ml-11">
                        Wybierz układ, który najlepiej pasuje do Twojej klatki
                        schodowej.
                      </p>
                      <StairShapePicker
                        value={stairShape}
                        onChange={(id) => {
                          setStairShape(id);
                          setShapeError(false);
                        }}
                      />
                      {shapeError && (
                        <p className="text-red-400 text-sm mt-3">
                          Wybierz kształt schodów, aby kontynuować.
                        </p>
                      )}

                      {/* Indicative price estimate */}
                      <AnimatePresence>
                        {estimate && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mt-6 flex items-center gap-4 bg-amber-500/8 border border-amber-500/25 rounded-xl px-5 py-4"
                          >
                            <div className="flex-1">
                              <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">
                                Orientacyjna wycena
                              </p>
                              <p
                                className="text-amber-400 text-2xl font-black"
                                style={{ fontFamily: "var(--font-outfit)" }}
                              >
                                {estimate.low.toLocaleString("pl-PL")} –{" "}
                                {estimate.high.toLocaleString("pl-PL")} zł
                              </p>
                            </div>
                            <p className="text-zinc-600 text-xs max-w-[140px] leading-relaxed">
                              Ostateczna cena ustalana indywidualnie po konsultacji.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Scroll hint */}
                      {stairShape && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-2 mt-4 text-zinc-500 text-xs"
                        >
                          <ChevronDown size={14} className="animate-bounce" />
                          Uzupełnij wymiary poniżej
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Step 2: Dimensions ── */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8">
                  <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-sm font-bold shrink-0">
                      {isSchody ? "3" : "2"}
                    </span>
                    Wymiary (w metrach)
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { name: "width"  as const, label: "Szerokość (m)", placeholder: "np. 1.2" },
                      { name: "height" as const, label: "Wysokość (m)",  placeholder: "np. 2.8" },
                      { name: "length" as const, label: "Długość (m)",   placeholder: "np. 4.0" },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="block text-zinc-400 text-sm font-medium mb-2">
                          {field.label}
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          placeholder={field.placeholder}
                          className={`w-full bg-zinc-800 border rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                            errors[field.name]
                              ? "border-red-500"
                              : "border-zinc-700 focus:border-amber-500"
                          }`}
                          {...register(field.name)}
                        />
                        {errors[field.name] && (
                          <p className="text-red-400 text-xs mt-1">
                            {errors[field.name]?.message}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <label className="block text-zinc-400 text-sm font-medium mb-2">
                      Lokalizacja montażu
                    </label>
                    <input
                      type="text"
                      placeholder="Miasto, województwo"
                      className={`w-full bg-zinc-800 border rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                        errors.location
                          ? "border-red-500"
                          : "border-zinc-700 focus:border-amber-500"
                      }`}
                      {...register("location")}
                    />
                    {errors.location && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.location.message}
                      </p>
                    )}
                  </div>
                  <div className="mt-4">
                    <label className="block text-zinc-400 text-sm font-medium mb-2">
                      Opis projektu / dodatkowe informacje
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Opisz swoje wymagania, styl, materiały, preferencje kolorystyczne..."
                      className="w-full bg-zinc-800 border border-zinc-700 focus:border-amber-500 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none"
                      {...register("description")}
                    />
                  </div>
                </div>

                {/* ── Step 3 / 4: Contact ── */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8">
                  <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-sm font-bold shrink-0">
                      {isSchody ? "4" : "3"}
                    </span>
                    Twoje dane kontaktowe
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-zinc-400 text-sm font-medium mb-2">
                        Imię i nazwisko
                      </label>
                      <input
                        type="text"
                        placeholder="Jan Kowalski"
                        className={`w-full bg-zinc-800 border rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                          errors.name
                            ? "border-red-500"
                            : "border-zinc-700 focus:border-amber-500"
                        }`}
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-zinc-400 text-sm font-medium mb-2">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        placeholder="500 000 000"
                        className={`w-full bg-zinc-800 border rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                          errors.phone
                            ? "border-red-500"
                            : "border-zinc-700 focus:border-amber-500"
                        }`}
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-xs mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-zinc-400 text-sm font-medium mb-2">
                        Adres e-mail
                      </label>
                      <input
                        type="email"
                        placeholder="jan@example.pl"
                        className={`w-full bg-zinc-800 border rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                          errors.email
                            ? "border-red-500"
                            : "border-zinc-700 focus:border-amber-500"
                        }`}
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── Submit ── */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-70 text-zinc-950 font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-200 hover:scale-[1.01] shadow-lg shadow-amber-500/20"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
                      Wysyłanie...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Wyślij zapytanie o wycenę
                    </>
                  )}
                </button>

                <p className="text-zinc-500 text-sm text-center">
                  Wysyłając formularz zgadzasz się na kontakt w sprawie wyceny.
                  Odpowiemy w ciągu 24 godzin roboczych.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
