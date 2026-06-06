"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Plus, Minus, Loader2, Package } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { CartItem } from "@/hooks/useCart";

type Props = {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
};

export default function CartDrawer({ open, onClose, cart, cartCount, cartTotal, onUpdateQty, onRemove }: Props) {
  const [checkingOut, setCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (!cart.length || checkingOut) return;
    setCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart.map((i) => ({ productId: i.product.id, quantity: i.quantity })) }),
      });
      const data = await res.json() as { url?: string; error?: string };
      if (data.url) window.location.href = data.url;
      else { alert(data.error ?? "Błąd podczas przechodzenia do kasy"); setCheckingOut(false); }
    } catch {
      alert("Błąd połączenia. Spróbuj ponownie.");
      setCheckingOut(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/70 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-zinc-900 border-l border-zinc-800 z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <ShoppingCart size={18} className="text-amber-400" />
                <h2 className="text-white font-bold">Koszyk</h2>
                {cartCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-zinc-950 text-xs flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </div>
              <button onClick={onClose} className="p-1.5 text-zinc-500 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center">
                    <ShoppingCart size={24} className="text-zinc-600" />
                  </div>
                  <p className="text-zinc-500 text-sm">Koszyk jest pusty</p>
                  <button onClick={onClose} className="text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors">
                    Przeglądaj produkty
                  </button>
                </div>
              ) : (
                cart.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-3 bg-zinc-800/50 rounded-xl p-3">
                    <div
                      className="w-16 h-16 rounded-lg bg-zinc-800 flex-shrink-0 bg-cover bg-center flex items-center justify-center"
                      style={product.image ? { backgroundImage: `url('${product.image}')` } : {}}
                    >
                      {!product.image && <Package size={20} className="text-zinc-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium leading-snug truncate">{product.name}</p>
                      <p className="text-amber-400 text-sm font-bold mt-0.5">{formatPrice(product.price * quantity)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => onUpdateQty(product.id, -1)}
                          className="w-6 h-6 rounded-lg bg-zinc-700 flex items-center justify-center text-zinc-300 hover:bg-zinc-600 transition-colors">
                          <Minus size={12} />
                        </button>
                        <span className="text-white text-sm font-medium w-4 text-center">{quantity}</span>
                        <button onClick={() => onUpdateQty(product.id, 1)}
                          className="w-6 h-6 rounded-lg bg-zinc-700 flex items-center justify-center text-zinc-300 hover:bg-zinc-600 transition-colors">
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <button onClick={() => onRemove(product.id)} className="self-start p-1 text-zinc-600 hover:text-red-400 transition-colors">
                      <X size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-5 border-t border-zinc-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 text-sm">Suma</span>
                  <span className="text-white font-black text-xl" style={{ fontFamily: "var(--font-outfit)" }}>
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <p className="text-zinc-600 text-xs">Koszty dostawy i podatki naliczane przy finalizacji</p>
                <button
                  onClick={handleCheckout}
                  disabled={checkingOut}
                  className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-zinc-950 font-bold py-3.5 rounded-xl transition-all"
                >
                  {checkingOut
                    ? <><Loader2 size={16} className="animate-spin" /> Przekierowanie...</>
                    : <><ShoppingCart size={16} /> Przejdź do kasy</>
                  }
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
