import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import prisma from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "Sklep — produkty" };

export default async function AdminShopPage() {
  const products = await prisma.product.findMany({ orderBy: [{ category: "asc" }, { name: "asc" }] });

  const categoryColors: Record<string, string> = {
    balustrady: "bg-blue-500/10 text-blue-400",
    schody: "bg-amber-500/10 text-amber-400",
    ogrodzenia: "bg-green-500/10 text-green-400",
    akcesoria: "bg-purple-500/10 text-purple-400",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-outfit)" }}>Sklep — produkty</h1>
          <p className="text-zinc-500 text-sm mt-1">{products.length} produktów · {products.filter((p) => p.stock).length} dostępnych</p>
        </div>
        <Link href="/admin/sklep/nowy" className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-4 py-2.5 rounded-xl text-sm transition-all">
          <Plus size={16} /> Dodaj produkt
        </Link>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Produkt</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Kategoria</th>
              <th className="px-5 py-3.5 text-right text-xs font-semibold text-zinc-400 uppercase tracking-wider">Cena</th>
              <th className="px-5 py-3.5 text-center text-xs font-semibold text-zinc-400 uppercase tracking-wider">Dostępny</th>
              <th className="px-5 py-3.5 text-center text-xs font-semibold text-zinc-400 uppercase tracking-wider">Ocena</th>
              <th className="px-5 py-3.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {products.length === 0 && (
              <tr><td colSpan={6} className="px-5 py-12 text-center text-zinc-600">Brak produktów</td></tr>
            )}
            {products.map((p) => {
              const images = JSON.parse(p.images) as string[];
              return (
                <tr key={p.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-cover bg-center shrink-0 bg-zinc-800"
                        style={images[0] ? { backgroundImage: `url('${images[0]}')` } : {}} />
                      <div>
                        <div className="text-white font-medium text-sm">{p.name}</div>
                        <div className="text-zinc-600 text-xs mt-0.5">/{p.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[p.category] ?? "bg-zinc-700 text-zinc-400"}`}>
                      {p.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="text-amber-400 font-bold text-sm">{formatPrice(p.price)}</div>
                    {p.oldPrice && <div className="text-zinc-600 text-xs line-through">{formatPrice(p.oldPrice)}</div>}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <form action={`/api/admin/products/${p.id}/toggle-stock`} method="POST">
                      <button type="submit" className={`text-xs px-2 py-1 rounded-full font-medium transition-colors ${p.stock ? "bg-green-500/10 text-green-400 hover:bg-green-500/20" : "bg-red-500/10 text-red-400 hover:bg-red-500/20"}`}>
                        {p.stock ? "Dostępny" : "Brak"}
                      </button>
                    </form>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className="text-zinc-300 text-sm">⭐ {p.rating}</div>
                    <div className="text-zinc-600 text-xs">{p.reviewCount} opinii</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <Link href={`/admin/sklep/${p.id}`}
                        className="p-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-colors">
                        <Pencil size={13} />
                      </Link>
                      <form action={`/api/admin/products/${p.id}`} method="POST">
                        <input type="hidden" name="_method" value="DELETE" />
                        <button type="submit" onClick={(e) => { if (!confirm(`Usuń "${p.name}"?`)) e.preventDefault(); }}
                          className="p-1.5 bg-zinc-800 hover:bg-red-500/10 text-zinc-500 hover:text-red-400 rounded-lg transition-colors">
                          <Trash2 size={13} />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
