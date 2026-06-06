"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Star, Package, Check, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import { useCart, type CartProduct } from "@/hooks/useCart";
import CartDrawer from "@/components/shop/CartDrawer";

type Product = CartProduct & { images: string[] };

type Props = {
  product: Product;
  related: Product[];
};

export default function ProductDetail({ product, related }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { cart, cartCount, cartTotal, addToCart, updateQty, removeFromCart } = useCart();

  const images = product.images.length > 0 ? product.images : [""];

  const handleAdd = () => {
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleAddAndOpen = () => {
    addToCart(product, quantity);
    setCartOpen(true);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
          <Link href="/sklep" className="hover:text-amber-400 transition-colors flex items-center gap-1">
            <ArrowLeft size={14} /> Sklep
          </Link>
          <span>/</span>
          <span className="capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-zinc-300 truncate max-w-48">{product.name}</span>
        </nav>

        {/* Cart badge in header */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium px-4 py-2.5 rounded-xl transition-all text-sm"
          >
            <ShoppingCart size={16} className="text-amber-400" />
            Koszyk
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-500 text-zinc-950 text-xs flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
              {images[activeImage] ? (
                <Image
                  src={images[activeImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Package size={64} className="text-zinc-700" />
                </div>
              )}
              {product.badge && (
                <span className={`absolute top-4 left-4 text-sm font-bold px-3 py-1.5 rounded-full ${
                  product.badge === "Bestseller" ? "bg-amber-500 text-zinc-950" :
                  product.badge === "Nowy" ? "bg-blue-500 text-white" : "bg-red-500 text-white"
                }`}>
                  {product.badge}
                </span>
              )}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage((i) => (i - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-zinc-950/70 backdrop-blur-sm flex items-center justify-center text-white hover:bg-zinc-950/90 transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setActiveImage((i) => (i + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-zinc-950/70 backdrop-blur-sm flex items-center justify-center text-white hover:bg-zinc-950/90 transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-colors ${
                      activeImage === i ? "border-amber-500" : "border-zinc-700 hover:border-zinc-500"
                    }`}
                  >
                    {img ? (
                      <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" sizes="64px" />
                    ) : (
                      <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                        <Package size={16} className="text-zinc-600" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="space-y-6">
            <div>
              <p className="text-amber-500 text-sm font-medium uppercase tracking-wider mb-2 capitalize">{product.category}</p>
              <h1
                className="text-3xl font-black text-white leading-tight mb-4"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.round(product.rating) ? "text-amber-400 fill-amber-400" : "text-zinc-600"}
                    />
                  ))}
                </div>
                <span className="text-zinc-300 text-sm font-medium">{product.rating.toFixed(1)}</span>
                <span className="text-zinc-600 text-sm">({product.reviewCount} opinii)</span>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-amber-400" style={{ fontFamily: "var(--font-outfit)" }}>
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-zinc-500 text-lg line-through">{formatPrice(product.oldPrice)}</span>
                )}
                {product.oldPrice && (
                  <span className="text-emerald-400 text-sm font-bold">
                    -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                  </span>
                )}
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-5">
              <p className="text-zinc-300 leading-relaxed">{product.description}</p>
            </div>

            {/* Stock */}
            <div className={`flex items-center gap-2 text-sm font-medium ${product.stock ? "text-emerald-400" : "text-red-400"}`}>
              <span className={`w-2 h-2 rounded-full ${product.stock ? "bg-emerald-400" : "bg-red-400"}`} />
              {product.stock ? "Dostępny — wysyłka do 3 dni roboczych" : "Chwilowo niedostępny"}
            </div>

            {/* Quantity + Add to cart */}
            {product.stock && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-zinc-700 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                    >
                      −
                    </button>
                    <span className="px-5 py-3 text-white font-bold border-x border-zinc-700 min-w-14 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button className="p-3 border border-zinc-700 rounded-xl text-zinc-400 hover:text-red-400 hover:border-red-400/30 transition-colors">
                    <Heart size={18} />
                  </button>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    onClick={handleAdd}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3.5 rounded-xl transition-all"
                  >
                    {justAdded ? <><Check size={16} className="text-emerald-400" /> Dodano!</> : <><ShoppingCart size={16} /> Dodaj do koszyka</>}
                  </motion.button>
                  <motion.button
                    onClick={handleAddAndOpen}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-3.5 rounded-xl transition-all"
                  >
                    Kup teraz
                  </motion.button>
                </div>
              </div>
            )}

            {/* Info pills */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { label: "Darmowa dostawa", sub: "od 500 zł" },
                { label: "Zwroty", sub: "14 dni bez pytań" },
                { label: "Gwarancja", sub: "24 miesiące" },
                { label: "Wsparcie", sub: "Pon–Pt 8–16" },
              ].map(({ label, sub }) => (
                <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-center">
                  <p className="text-white text-xs font-semibold">{label}</p>
                  <p className="text-zinc-500 text-xs mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-black text-white mb-6" style={{ fontFamily: "var(--font-outfit)" }}>
              Podobne produkty
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/sklep/${rel.slug}`}
                  className="group bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <div className="relative h-36 overflow-hidden">
                    {rel.image ? (
                      <Image
                        src={rel.image}
                        alt={rel.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
                        <Package size={24} className="text-zinc-700" />
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-white text-sm font-semibold leading-snug line-clamp-2 mb-1">{rel.name}</p>
                    <p className="text-amber-400 font-bold text-sm">{formatPrice(rel.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

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
