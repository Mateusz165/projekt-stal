"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Eye } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";

const categories = ["Schody loftowe", "Balustrady", "Ogrodzenia", "Inspiracje", "Poradniki", "Aktualności"];

export default function NewBlogPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [form, setForm] = useState({
    title: "", slug: "", excerpt: "", content: "", category: "Inspiracje",
    image: "", published: false,
  });

  const generateSlug = (title: string) =>
    title.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();

  const update = (field: string, value: string | boolean) => {
    const upd: Record<string, string | boolean> = { [field]: value };
    if (field === "title" && !form.slug) upd.slug = generateSlug(value as string);
    setForm({ ...form, ...upd });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/admin/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) { router.push("/admin/blog"); router.refresh(); }
    else { alert("Błąd zapisu"); setLoading(false); }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/blog" className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <h1 className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-outfit)" }}>Nowy artykuł</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-zinc-400 text-sm mb-1.5">Tytuł *</label>
            <input required value={form.title} onChange={(e) => update("title", e.target.value)}
              placeholder="Tytuł artykułu" className={inputCls} />
          </div>
          <div>
            <label className="block text-zinc-400 text-sm mb-1.5">Slug (URL) *</label>
            <div className="flex items-center gap-2">
              <span className="text-zinc-500 text-sm">/blog/</span>
              <input required value={form.slug} onChange={(e) => update("slug", e.target.value)}
                placeholder="moj-artykul" className={`${inputCls} flex-1`} />
            </div>
          </div>
          <div>
            <label className="block text-zinc-400 text-sm mb-1.5">Kategoria</label>
            <select value={form.category} onChange={(e) => update("category", e.target.value)} className={inputCls}>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-zinc-400 text-sm mb-1.5">Zdjęcie główne</label>
            <ImageUploader
              images={form.image ? [form.image] : []}
              onChange={(imgs) => update("image", imgs[0] ?? "")}
              max={1}
            />
          </div>
          <div>
            <label className="block text-zinc-400 text-sm mb-1.5">Krótki opis (excerpt)</label>
            <textarea rows={2} value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)}
              placeholder="Krótki opis widoczny na liście artykułów..." className={`${inputCls} resize-none`} />
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-white font-semibold text-sm uppercase tracking-wider">Treść artykułu</label>
            <button type="button" onClick={() => setPreview(!preview)}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white text-xs transition-colors">
              <Eye size={13} /> {preview ? "Edytor" : "Podgląd"}
            </button>
          </div>
          <p className="text-zinc-600 text-xs">Obsługuje Markdown: ## Nagłówek, **pogrubienie**, - lista</p>
          {preview ? (
            <div className="prose prose-invert prose-amber max-w-none min-h-48 text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap border border-zinc-800 rounded-xl p-4">
              {form.content || <span className="text-zinc-600">Brak treści</span>}
            </div>
          ) : (
            <textarea rows={16} value={form.content} onChange={(e) => update("content", e.target.value)}
              placeholder="# Nagłówek&#10;&#10;Treść artykułu w formacie Markdown...&#10;&#10;## Podsekcja&#10;&#10;Tekst..."
              className={`${inputCls} resize-y min-h-48 font-mono text-xs`} />
          )}
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <label className="flex items-center gap-3 cursor-pointer">
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${form.published ? "bg-amber-500 border-amber-500" : "border-zinc-600"}`}
              onClick={() => update("published", !form.published)}>
              {form.published && <span className="text-zinc-950 text-xs font-bold">✓</span>}
            </div>
            <div>
              <span className="text-zinc-300 text-sm font-medium">Opublikuj od razu</span>
              <p className="text-zinc-600 text-xs mt-0.5">Artykuł będzie widoczny na stronie po zapisaniu</p>
            </div>
          </label>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={loading}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-zinc-950 font-bold px-6 py-3 rounded-xl transition-all">
            {loading ? <div className="w-4 h-4 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" /> : <Save size={16} />}
            Zapisz artykuł
          </button>
          <Link href="/admin/blog" className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl transition-colors text-sm font-medium">Anuluj</Link>
        </div>
      </form>
    </div>
  );
}

const inputCls = "w-full bg-zinc-800 border border-zinc-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all text-sm";
