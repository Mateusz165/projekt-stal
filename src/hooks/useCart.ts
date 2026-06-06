"use client";

import { useState, useEffect, useCallback } from "react";

export type CartProduct = {
  id: number; slug: string; name: string; category: string;
  price: number; oldPrice: number | null; rating: number; reviewCount: number;
  stock: boolean; badge: string | null; image: string; description: string;
};

export type CartItem = { product: CartProduct; quantity: number };

const STORAGE_KEY = "projekt-stal-cart";

function load(): CartItem[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]"); } catch { return []; }
}

function save(items: CartItem[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCart(load());
    setMounted(true);
  }, []);

  const addToCart = useCallback((product: CartProduct, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      const next = existing
        ? prev.map((i) => i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i)
        : [...prev, { product, quantity: qty }];
      save(next);
      return next;
    });
  }, []);

  const updateQty = useCallback((id: number, delta: number) => {
    setCart((prev) => {
      const next = prev
        .map((i) => i.product.id === id ? { ...i, quantity: i.quantity + delta } : i)
        .filter((i) => i.quantity > 0);
      save(next);
      return next;
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => {
      const next = prev.filter((i) => i.product.id !== id);
      save(next);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }, []);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);

  return { cart, cartCount, cartTotal, addToCart, updateQty, removeFromCart, clearCart, mounted };
}
