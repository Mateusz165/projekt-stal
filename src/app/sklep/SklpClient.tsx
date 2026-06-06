"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, Search, Star, Package } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { useCart, type CartProduct } from "@/hooks/useCart";
import CartDrawer from "@/components/shop/CartDrawer";

type Product = CartProduct & { images: string[] };

const categories = [
  { id: "all", label: "Wszystkie" },
  { id: "balustrady", label: "Balustrady" },
  { id: "schody", label: "Schody" },
  { id: "ogrodzenia", label: "Ogrodzenia" },
  { id: "akcesoria", label: "Akcesoria" },
];

export default function SklpClient({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, cartCount, cartTotal, addToCart, updateQty, removeFromCart } = useCart();

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      {/* Cart button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setCartOpen(true)}
          className="relative flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-5 py-3 rounded-xl transition-all"
        >
          <ShoppingCart size={18} />
          Koszyk
          {cartCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-zinc-950 text-amber-400 text-xs flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Szukaj produktu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl pl-11 pr-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-amber-500 text-zinc-950"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="group bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-2xl overflow-hidden transition-all duration-300 hover-lift flex flex-col">
                <Link href={`/sklep/${product.slug}`} className="relative h-52 overflow-hidden block">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
                      <Package size={32} className="text-zinc-700" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 to-transparent" />
                  {product.badge && (
                    <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${
                      product.badge === "Bestseller" ? "bg-amber-500 text-zinc-950" :
                      product.badge === "Nowy" ? "bg-blue-500 text-white" : "bg-red-500 text-white"
                    }`}>
                      {product.badge}
                    </span>
                  )}
                  {!product.stock && (
                    <div className="absolute inset-0 bg-zinc-950/70 flex items-center justify-center">
                      <span className="text-zinc-300 text-sm font-medium bg-zinc-800 px-3 py-1 rounded-full">Niedostępny</span>
                    </div>
                  )}
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-zinc-950/60 backdrop-blur-sm flex items-center justify-center text-zinc-400 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                    <Heart size={15} />
                  </button>
                </Link>

                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span className="text-zinc-300 text-xs font-medium">{product.rating.toFixed(1)}</span>
                    <span className="text-zinc-600 text-xs">({product.reviewCount})</span>
                  </div>
                  <Link href={`/sklep/${product.slug}`} className="hover:text-amber-400 transition-colors">
                    <h3 className="text-white font-semibold text-sm mb-1 leading-snug flex-1">{product.name}</h3>
                  </Link>
                  <p className="text-zinc-500 text-xs mb-3 leading-relaxed line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-amber-400 font-black text-lg" style={{ fontFamily: "var(--font-outfit)" }}>
                        {formatPrice(product.price)}
                      </span>
                      {product.oldPrice && (
                        <span className="text-zinc-600 text-xs line-through ml-2">{formatPrice(product.oldPrice)}</span>
                      )}
                    </div>
                    <button
                      onClick={() => { addToCart(product); setCartOpen(true); }}
                      disabled={!product.stock}
                      className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-zinc-950 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      <ShoppingCart size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-zinc-500 text-lg">Brak produktów dla wybranych filtrów.</p>
        </div>
      )}

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
      />
    </>
  );
}
