import Link from "next/link";
import { CheckCircle, ShoppingBag, ArrowLeft } from "lucide-react";

export const metadata = { title: "Zamówienie złożone | Projekt-Stal" };

export default function SukcesPage() {
  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-emerald-400" />
        </div>

        <h1
          className="text-3xl font-black text-white mb-3"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Dziękujemy za zamówienie!
        </h1>
        <p className="text-zinc-400 leading-relaxed mb-2">
          Twoje zamówienie zostało pomyślnie złożone i opłacone.
        </p>
        <p className="text-zinc-500 text-sm mb-10">
          Potwierdzenie wysłaliśmy na podany adres e-mail. Skontaktujemy się z Tobą w sprawie realizacji.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/sklep"
            className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-6 py-3 rounded-xl transition-all"
          >
            <ShoppingBag size={16} />
            Wróć do sklepu
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium px-6 py-3 rounded-xl transition-all"
          >
            <ArrowLeft size={16} />
            Strona główna
          </Link>
        </div>
      </div>
    </main>
  );
}
