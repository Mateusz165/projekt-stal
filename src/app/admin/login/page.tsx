"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "Nieprawidłowy e-mail lub hasło.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-amber-500 rotate-45 rounded-sm" />
              <span className="absolute inset-0 flex items-center justify-center text-zinc-950 font-black text-base z-10">PS</span>
            </div>
            <div className="text-left">
              <div className="text-white font-black text-xl" style={{ fontFamily: "var(--font-outfit)" }}>PROJEKT-STAL</div>
              <div className="text-amber-400 text-xs tracking-widest uppercase">Panel admina</div>
            </div>
          </div>
          <p className="text-zinc-500 text-sm">Zaloguj się, aby zarządzać stroną</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-5"
        >
          <div>
            <label className="block text-zinc-300 text-sm font-medium mb-2">
              Adres e-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@projekt-stal.pl"
              required
              autoComplete="email"
              className="w-full bg-zinc-800 border border-zinc-700 focus:border-amber-500 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-zinc-300 text-sm font-medium mb-2">
              Hasło
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="w-full bg-zinc-800 border border-zinc-700 focus:border-amber-500 rounded-xl px-4 py-3 pr-11 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-zinc-950 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={17} />
                Zaloguj się
              </>
            )}
          </button>

          <div className="pt-2 border-t border-zinc-800 text-center">
            <p className="text-zinc-600 text-xs">
              Domyślne dane testowe:<br />
              <span className="text-zinc-400 font-mono">admin@projekt-stal.pl</span> /{" "}
              <span className="text-zinc-400 font-mono">admin123</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
