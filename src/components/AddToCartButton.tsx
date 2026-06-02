"use client";

import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";

type AddToCartButtonProps = {
  productId: string;
  className?: string;
  label?: string;
};

export function AddToCartButton({ productId, className, label = "장바구니 담기" }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      className={
        className ??
        "inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-line bg-white px-4 text-sm font-black text-ink transition hover:border-ink"
      }
      onClick={(event) => {
        event.preventDefault();
        addItem(productId);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1200);
      }}
    >
      <ShoppingBag size={17} />
      {added ? "담았습니다" : label}
    </button>
  );
}
