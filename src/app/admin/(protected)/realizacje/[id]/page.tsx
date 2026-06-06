"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";

const categories = ["Schody", "Balustrady", "Ogrodzenia", "Tarasy", "Zadaszenia", "Bramy", "Garaże", "Inne"];

export default function EditProjectPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const [form, setForm] = useState({
    title: "", category: "Schody", location: "", year: new Date().getFullYear(), featured: false,
  });

  useEffect(() => {
    fetch(`/api/admin/projects/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setForm({ title: data.title, category: data.category, location: data.location, year: data.year, featured: data.featured });
        setImages(JSON.parse(data.images || "[]") as string[]);
        setFetching(false);
      })
      .catch(() => setFetching(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`/api/admin/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, images: images.filter(Boolean) }),
    });
    if (res.ok) { router.push("/admin/realizacje"); router.refresh(); }
    else { alert("Błąd zapisu"); setLoading(false); }
  };

  if (fetching) return <div className="text-zinc-500 animate-pulse">Ładowanie...</div>;

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/realizacje" className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <h1 className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-outfit)" }}>Edytuj realizację</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-zinc-400 text-sm mb-1.5">Tytuł *</label>
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-400 text-sm mb-1.5">Kategoria</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls}>
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1.5">Rok</label>
              <input type="number" min="2010" max="2030" value={form.year}
                onChange={(e) => setForm({ ...form, year: +e.target.value })} className={inputCls} />
            </div>
          </div>
          <div>
            <label className="block text-zinc-400 text-sm mb-1.5">Lokalizacja *</label>
            <input required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={inputCls} />
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${form.featured ? "bg-amber-500 border-amber-500" : "border-zinc-600"}`}
              onClick={() => setForm({ ...form, featured: !form.featured })}>
              {form.featured && <span className="text-zinc-950 text-xs font-bold">✓</span>}
            </div>
            <span className="text-zinc-300 text-sm">Wyróżniona realizacja</span>
          </label>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-white font-semibold text-sm uppercase tracking-wider">Zdjęcia</h2>
          <ImageUploader images={images} onChange={setImages} max={8} />
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={loading}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-zinc-950 font-bold px-6 py-3 rounded-xl transition-all">
            {loading ? <div className="w-4 h-4 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" /> : <Save size={16} />}
            Zapisz zmiany
          </button>
          <Link href="/admin/realizacje" className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl transition-colors text-sm font-medium">Anuluj</Link>
        </div>
      </form>
    </div>
  );
}

const inputCls = "w-full bg-zinc-800 border border-zinc-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all text-sm";
