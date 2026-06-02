"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type CartItem = {
  productId: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  totalQuantity: number;
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "moa-tech-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      setItems(JSON.parse(saved) as CartItem[]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    return {
      items,
      totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
      addItem: (productId) => {
        setItems((current) => {
          const existing = current.find((item) => item.productId === productId);
          if (existing) {
            return current.map((item) =>
              item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
            );
          }
          return [...current, { productId, quantity: 1 }];
        });
      },
      removeItem: (productId) => {
        setItems((current) => current.filter((item) => item.productId !== productId));
      },
      updateQuantity: (productId, quantity) => {
        setItems((current) =>
          current
            .map((item) => (item.productId === productId ? { ...item, quantity: Math.max(1, quantity) } : item))
            .filter((item) => item.quantity > 0)
        );
      },
      clearCart: () => setItems([])
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
