"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";

const categoryOptions = ["balustrady", "schody", "ogrodzenia", "akcesoria"];
const badgeOptions = ["", "Bestseller", "Nowy", "Promocja"];

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "", slug: "", description: "", price: "", oldPrice: "",
    category: "balustrady", badge: "", stock: true, published: true,
    rating: "5.0", reviewCount: "0",
  });

  const generateSlug = (name: string) =>
    name.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();

  const update = (field: string, value: string | boolean) => {
    const upd: Record<string, string | boolean> = { [field]: value };
    if (field === "name" && !form.slug) upd.slug = generateSlug(value as string);
    setForm({ ...form, ...upd });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...form,
      price: parseFloat(form.price),
      oldPrice: form.oldPrice ? parseFloat(form.oldPrice) : null,
      rating: parseFloat(form.rating),
      reviewCount: parseInt(form.reviewCount),
      images: images.filter(Boolean),
      badge: form.badge || null,
    };
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) { router.push("/admin/sklep"); router.refresh(); }
    else { alert("Błąd zapisu"); setLoading(false); }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/sklep" className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <h1 className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-outfit)" }}>Nowy produkt</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-white font-semibold text-sm uppercase tracking-wider">Podstawowe informacje</h2>
          <div>
            <label className="block text-zinc-400 text-sm mb-1.5">Nazwa produktu *</label>
            <input required value={form.name} onChange={(e) => update("name", e.target.value)}
              placeholder="np. Słupek balustradowy 40×40" className={inputCls} />
          </div>
          <div>
            <label className="block text-zinc-400 text-sm mb-1.5">Slug (URL) *</label>
            <input required value={form.slug} onChange={(e) => update("slug", e.target.value)}
              placeholder="slupek-balustradowy-40x40" className={inputCls} />
          </div>
          <div>
            <label className="block text-zinc-400 text-sm mb-1.5">Opis *</label>
            <textarea required rows={3} value={form.description} onChange={(e) => update("description", e.target.value)}
              placeholder="Szczegółowy opis produktu..." className={`${inputCls} resize-none`} />
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-white font-semibold text-sm uppercase tracking-wider">Cena i kategoria</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-400 text-sm mb-1.5">Cena (PLN) *</label>
              <input required type="number" min="0" step="0.01" value={form.price}
                onChange={(e) => update("price", e.target.value)} placeholder="89.00" className={inputCls} />
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1.5">Cena przed obniżką</label>
              <input type="number" min="0" step="0.01" value={form.oldPrice}
                onChange={(e) => update("oldPrice", e.target.value)} placeholder="109.00" className={inputCls} />
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1.5">Kategoria</label>
              <select value={form.category} onChange={(e) => update("category", e.target.value)} className={inputCls}>
                {categoryOptions.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1.5">Badge</label>
              <select value={form.badge} onChange={(e) => update("badge", e.target.value)} className={inputCls}>
                {badgeOptions.map((b) => <option key={b} value={b}>{b || "(brak)"}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1.5">Ocena (1-5)</label>
              <input type="number" min="1" max="5" step="0.1" value={form.rating}
                onChange={(e) => update("rating", e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1.5">Liczba opinii</label>
              <input type="number" min="0" value={form.reviewCount}
                onChange={(e) => update("reviewCount", e.target.value)} className={inputCls} />
            </div>
          </div>
          <div className="flex gap-6 pt-1">
            {[{ field: "stock", label: "Dostępny w magazynie" }, { field: "published", label: "Widoczny w sklepie" }].map(({ field, label }) => (
              <label key={field} className="flex items-center gap-2.5 cursor-pointer">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${form[field as keyof typeof form] ? "bg-amber-500 border-amber-500" : "border-zinc-600"}`}
                  onClick={() => update(field, !form[field as keyof typeof form])}>
                  {form[field as keyof typeof form] && <span className="text-zinc-950 text-xs font-bold">✓</span>}
                </div>
                <span className="text-zinc-300 text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-white font-semibold text-sm uppercase tracking-wider">Zdjęcia</h2>
          <ImageUploader images={images} onChange={setImages} max={6} />
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={loading}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-zinc-950 font-bold px-6 py-3 rounded-xl transition-all">
            {loading ? <div className="w-4 h-4 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" /> : <Save size={16} />}
            Zapisz produkt
          </button>
          <Link href="/admin/sklep" className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl transition-colors text-sm font-medium">Anuluj</Link>
        </div>
      </form>
    </div>
  );
}

const inputCls = "w-full bg-zinc-800 border border-zinc-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all text-sm";
