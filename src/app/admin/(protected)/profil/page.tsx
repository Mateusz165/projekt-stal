"use client";

import type { Metadata } from "next";
import { useState } from "react";
import { KeyRound, Check, Shield } from "lucide-react";

export default function ProfilPage() {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirm: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.newPassword !== form.confirm) {
      setError("Nowe hasła nie są identyczne");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/admin/profil", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: form.currentPassword, newPassword: form.newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Błąd serwera");
      setStatus("success");
      setForm({ currentPassword: "", newPassword: "", confirm: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Wystąpił błąd");
      setStatus("error");
    }
  };

  return (
    <div className="max-w-md space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-outfit)" }}>Profil</h1>
        <p className="text-zinc-500 text-sm mt-1">Zarządzaj swoim kontem administratora</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
            <KeyRound size={18} className="text-amber-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Zmiana hasła</p>
            <p className="text-zinc-500 text-xs">Min. 8 znaków</p>
          </div>
        </div>

        {status === "success" && (
          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 text-sm px-4 py-3 rounded-xl mb-4">
            <Check size={15} /> Hasło zostało zmienione
          </div>
        )}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { key: "currentPassword", label: "Aktualne hasło" },
            { key: "newPassword", label: "Nowe hasło" },
            { key: "confirm", label: "Potwierdź nowe hasło" },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-zinc-400 text-sm mb-1.5">{label}</label>
              <input
                type="password"
                required
                value={form[key as keyof typeof form]}
                onChange={(e) => update(key as keyof typeof form, e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 focus:border-amber-500 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm transition-all"
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-zinc-950 font-bold py-3 rounded-xl transition-all mt-2"
          >
            <Shield size={16} />
            {status === "loading" ? "Zapisywanie..." : "Zmień hasło"}
          </button>
        </form>
      </div>
    </div>
  );
}
