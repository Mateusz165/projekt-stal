export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Star, Quote, MessageSquare } from "lucide-react";
import prisma from "@/lib/prisma";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import CTASection from "@/components/home/CTASection";
import TestimonialForm from "@/components/opinie/TestimonialForm";

export const metadata: Metadata = {
  title: "Opinie klientów – Projekt-Stal Białystok",
  description: "Przeczytaj opinie klientów Projekt-Stal. Ponad 500 zadowolonych klientów w całej Polsce. Schody stalowe, balustrady, ogrodzenia – sprawdź co o nas mówią.",
};

const RATING_LABELS: Record<number, string> = { 5: "Doskonały", 4: "Dobry", 3: "Przeciętny" };

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= rating ? "text-amber-400 fill-amber-400" : "text-zinc-700"}
        />
      ))}
    </div>
  );
}

export default async function OpiniePage() {
  const testimonials = await prisma.testimonial.findMany({
    where: { published: true },
    orderBy: [{ rating: "desc" }, { createdAt: "desc" }],
  }).catch(() => []);

  const avgRating = testimonials.length
    ? testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length
    : 5;

  const ratingCounts = [5, 4, 3, 2, 1].map((r) => ({
    rating: r,
    count: testimonials.filter((t) => t.rating === r).length,
  }));

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4">
              <span className="h-px w-8 bg-amber-400/60" />
              Opinie klientów
            </div>
            <h1
              className="text-5xl sm:text-6xl font-black text-white mb-5 max-w-2xl leading-tight"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Co mówią
              <br />
              <span className="text-gradient-gold">nasi klienci</span>
            </h1>
            <p className="text-zinc-300 text-lg max-w-xl leading-relaxed">
              Zaufało nam ponad 500 klientów. Każda opinia to historia zakończonego projektu i zadowolonego inwestora.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Summary stats */}
      {testimonials.length > 0 && (
        <section className="bg-zinc-950 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* Average rating */}
                  <div className="text-center md:text-left">
                    <div className="text-7xl font-black text-amber-400 mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                      {avgRating.toFixed(1)}
                    </div>
                    <Stars rating={Math.round(avgRating)} size={24} />
                    <p className="text-zinc-400 mt-3 text-sm">
                      Średnia z {testimonials.length} {testimonials.length === 1 ? "opinii" : testimonials.length < 5 ? "opinii" : "opinii"}
                    </p>
                  </div>

                  {/* Rating distribution */}
                  <div className="space-y-2">
                    {ratingCounts.map(({ rating, count }) => (
                      <div key={rating} className="flex items-center gap-3">
                        <span className="text-zinc-400 text-sm w-4 text-right">{rating}</span>
                        <Star size={12} className="text-amber-400 fill-amber-400 flex-shrink-0" />
                        <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full transition-all duration-700"
                            style={{ width: testimonials.length ? `${(count / testimonials.length) * 100}%` : "0%" }}
                          />
                        </div>
                        <span className="text-zinc-500 text-xs w-6 text-right">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Testimonials grid */}
      <section className="bg-zinc-950 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {testimonials.length === 0 ? (
            <AnimatedSection>
              <div className="text-center py-24">
                <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare size={24} className="text-zinc-600" />
                </div>
                <p className="text-zinc-500 text-lg mb-2">Brak opinii do wyświetlenia</p>
                <p className="text-zinc-600 text-sm">Opinie pojawią się tutaj po skonfigurowaniu bazy danych.</p>
              </div>
            </AnimatedSection>
          ) : (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <StaggerItem key={t.id}>
                  <article className="group bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-2xl p-6 transition-all duration-300 flex flex-col h-full">
                    {/* Quote icon */}
                    <div className="mb-4">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                        <Quote size={16} className="text-amber-400" />
                      </div>
                    </div>

                    {/* Stars + label */}
                    <div className="flex items-center gap-2 mb-4">
                      <Stars rating={t.rating} size={14} />
                      {RATING_LABELS[t.rating] && (
                        <span className="text-amber-400 text-xs font-semibold">{RATING_LABELS[t.rating]}</span>
                      )}
                    </div>

                    {/* Text */}
                    <p className="text-zinc-300 leading-relaxed text-sm flex-1 mb-5">
                      &ldquo;{t.text}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-400 font-bold text-sm">{t.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{t.name}</p>
                        <p className="text-zinc-500 text-xs">{t.location} · {t.project}</p>
                      </div>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>

      {/* Inline review form */}
      <section className="bg-zinc-950 pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="bg-gradient-to-br from-amber-500/5 to-amber-600/5 border border-amber-500/10 rounded-3xl p-8 md:p-10">
              <div className="text-center mb-8">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                  <Star size={24} className="text-amber-400 fill-amber-400" />
                </div>
                <h2 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                  Podziel się opinią
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Jesteś naszym klientem? Twój feedback pomaga nam się rozwijać i buduje zaufanie przyszłych klientów.
                </p>
              </div>
              <TestimonialForm />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTASection />
    </>
  );
}
