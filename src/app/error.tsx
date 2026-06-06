"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={36} className="text-red-400" />
        </div>
        <h1 className="text-2xl font-black text-white mb-3" style={{ fontFamily: "var(--font-outfit)" }}>
          Coś poszło nie tak
        </h1>
        <p className="text-zinc-400 mb-2 leading-relaxed">
          Wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę.
        </p>
        {error.digest && (
          <p className="text-zinc-600 text-xs mb-8 font-mono">Kod błędu: {error.digest}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-6 py-3 rounded-xl transition-all"
          >
            <RefreshCw size={16} /> Spróbuj ponownie
          </button>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium px-6 py-3 rounded-xl transition-all"
          >
            <Home size={16} /> Strona główna
          </Link>
        </div>
      </div>
    </main>
  );
}
