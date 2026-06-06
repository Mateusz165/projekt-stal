import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div
          className="text-[9rem] font-black leading-none mb-4 text-gradient-gold"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          404
        </div>
        <h1 className="text-2xl font-black text-white mb-3" style={{ fontFamily: "var(--font-outfit)" }}>
          Strona nie istnieje
        </h1>
        <p className="text-zinc-400 mb-10 leading-relaxed">
          Strona, której szukasz, mogła zostać przeniesiona, usunięta lub nigdy nie istniała.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-6 py-3 rounded-xl transition-all"
          >
            <Home size={16} /> Strona główna
          </Link>
          <Link
            href="/realizacje"
            className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium px-6 py-3 rounded-xl transition-all"
          >
            <Search size={16} /> Przeglądaj realizacje
          </Link>
        </div>
        <p className="text-zinc-600 text-sm mt-10">
          Potrzebujesz pomocy?{" "}
          <Link href="/kontakt" className="text-amber-400 hover:text-amber-300 transition-colors">
            Napisz do nas
          </Link>
        </p>
      </div>
    </main>
  );
}
