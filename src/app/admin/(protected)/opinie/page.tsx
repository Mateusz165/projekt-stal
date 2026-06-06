import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Star, Trash2 } from "lucide-react";
import prisma from "@/lib/prisma";

export const metadata: Metadata = { title: "Opinie" };

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-outfit)" }}>Opinie</h1>
          <p className="text-zinc-500 text-sm mt-1">
            {testimonials.length} opinii · {testimonials.filter((t) => t.published).length} widocznych
          </p>
        </div>
        <Link
          href="/admin/opinie/nowa"
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-4 py-2.5 rounded-xl text-sm transition-all"
        >
          <Plus size={16} /> Dodaj opinię
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {testimonials.length === 0 && (
          <div className="col-span-3 py-16 text-center text-zinc-600">
            <Star className="mx-auto mb-3 text-zinc-700" size={32} />
            Brak opinii
          </div>
        )}
        {testimonials.map((t) => (
          <div key={t.id} className="bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-2xl p-5 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm shrink-0">
                  {t.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  {t.location && <div className="text-zinc-500 text-xs">📍 {t.location}</div>}
                  {t.project && <div className="text-zinc-500 text-xs">{t.project}</div>}
                </div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${t.published ? "bg-green-500/10 text-green-400" : "bg-zinc-700 text-zinc-500"}`}>
                {t.published ? "Widoczna" : "Ukryta"}
              </span>
            </div>

            <div className="flex mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={12} className={i < t.rating ? "fill-amber-400 text-amber-400" : "text-zinc-700"} />
              ))}
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed line-clamp-4">&ldquo;{t.text}&rdquo;</p>

            <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between">
              <span className="text-zinc-600 text-xs">
                {new Date(t.createdAt).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" })}
              </span>
              <form action={`/api/admin/testimonials?id=${t.id}`} method="POST">
                <input type="hidden" name="_method" value="DELETE" />
                <button
                  type="submit"
                  onClick={(e) => { if (!confirm(`Usuń opinię od "${t.name}"?`)) e.preventDefault(); }}
                  className="p-1.5 bg-zinc-800 hover:bg-red-500/10 text-zinc-500 hover:text-red-400 rounded-lg transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
