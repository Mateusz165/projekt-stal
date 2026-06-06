"use client";

import { useState } from "react";
import { Star, Send, Check } from "lucide-react";

export default function TestimonialForm() {
  const [rating, setRating] = useState(5);
  const [hovered, setHovered] = useState(0);
  const [form, setForm] = useState({ name: "", location: "", project: "", text: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, rating }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Błąd serwera");
      }
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Wystąpił błąd");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
          <Check size={28} className="text-green-400" />
        </div>
        <h3 className="text-white font-bold text-xl mb-2">Dziękujemy za opinię!</h3>
        <p className="text-zinc-400 text-sm">Twoja opinia zostanie opublikowana po weryfikacji.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      {/* Star rating */}
      <div>
        <label className="block text-zinc-400 text-sm mb-2">Ocena</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              onMouseEnter={() => setHovered(s)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setRating(s)}
              className="p-1"
            >
              <Star
                size={28}
                className={(hovered || rating) >= s ? "text-amber-400 fill-amber-400" : "text-zinc-700"}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-zinc-400 text-sm mb-1.5">Imię i nazwisko *</label>
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 focus:border-amber-500 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm transition-all"
            placeholder="Jan Kowalski"
          />
        </div>
        <div>
          <label className="block text-zinc-400 text-sm mb-1.5">Miejscowość</label>
          <input
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 focus:border-amber-500 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm transition-all"
            placeholder="Białystok"
          />
        </div>
      </div>

      <div>
        <label className="block text-zinc-400 text-sm mb-1.5">Rodzaj realizacji</label>
        <input
          value={form.project}
          onChange={(e) => update("project", e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 focus:border-amber-500 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm transition-all"
          placeholder="Schody stalowe, balustrada..."
        />
      </div>

      <div>
        <label className="block text-zinc-400 text-sm mb-1.5">Treść opinii *</label>
        <textarea
          required
          rows={4}
          maxLength={1000}
          value={form.text}
          onChange={(e) => update("text", e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 focus:border-amber-500 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm transition-all resize-none"
          placeholder="Podziel się swoją opinią o realizacji..."
        />
        <div className="text-right text-zinc-600 text-xs mt-1">{form.text.length}/1000</div>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-zinc-950 font-bold py-3.5 rounded-xl transition-all"
      >
        <Send size={16} />
        {status === "loading" ? "Wysyłanie..." : "Wyślij opinię"}
      </button>
      <p className="text-zinc-600 text-xs text-center">Opinia zostanie opublikowana po weryfikacji przez administratora.</p>
    </form>
  );
}
