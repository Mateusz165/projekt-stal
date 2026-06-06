"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Star } from "lucide-react";

export default function NewTestimonialPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(5);
  const [form, setForm] = useState({ name: "", location: "", project: "", text: "", published: true });

  const update = (field: string, value: string | boolean) => setForm({ ...form, [field]: value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/admin/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, rating }),
    });
    if (res.ok) { router.push("/admin/opinie"); router.refresh(); }
    else { alert("Błąd zapisu"); setLoading(false); }
  };

  return (
    <div className="max-w-xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/opinie" className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <h1 className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-outfit)" }}>Dodaj opinię</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-zinc-400 text-sm mb-1.5">Imię i nazwisko *</label>
            <input required value={form.name} onChange={(e) => update("name", e.target.value)}
              placeholder="Jan Kowalski" className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-400 text-sm mb-1.5">Lokalizacja</label>
              <input value={form.location} onChange={(e) => update("location", e.target.value)}
                placeholder="Białystok" className={inputCls} />
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1.5">Projekt / usługa</label>
              <input value={form.project} onChange={(e) => update("project", e.target.value)}
                placeholder="np. Schody loftowe" className={inputCls} />
            </div>
          </div>
          <div>
            <label className="block text-zinc-400 text-sm mb-3">Ocena</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => setRating(star)}>
                  <Star size={24} className={`transition-colors ${star <= rating ? "fill-amber-400 text-amber-400" : "text-zinc-600 hover:text-zinc-400"}`} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-zinc-400 text-sm mb-1.5">Treść opinii *</label>
            <textarea required rows={4} value={form.text} onChange={(e) => update("text", e.target.value)}
              placeholder="Treść opinii klienta..." className={`${inputCls} resize-none`} />
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${form.published ? "bg-amber-500 border-amber-500" : "border-zinc-600"}`}
              onClick={() => update("published", !form.published)}>
              {form.published && <span className="text-zinc-950 text-xs font-bold">✓</span>}
            </div>
            <span className="text-zinc-300 text-sm">Widoczna na stronie (opublikowana)</span>
          </label>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={loading}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-zinc-950 font-bold px-6 py-3 rounded-xl transition-all">
            {loading ? <div className="w-4 h-4 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" /> : <Save size={16} />}
            Zapisz opinię
          </button>
          <Link href="/admin/opinie" className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl transition-colors text-sm font-medium">Anuluj</Link>
        </div>
      </form>
    </div>
  );
}

const inputCls = "w-full bg-zinc-800 border border-zinc-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all text-sm";
