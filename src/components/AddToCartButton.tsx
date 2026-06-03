"use client";

import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";

type AddToCartButtonProps = {
  productId: string;
  className?: string;
  label?: string;
};

export function AddToCartButton({ productId, className, label = "장바구니" }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      className={
        className ??
        "inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-lg border border-line bg-white px-2 text-xs font-black text-ink transition hover:border-ink sm:h-11 sm:gap-2 sm:px-4 sm:text-sm"
      }
      onClick={(event) => {
        event.preventDefault();
        addItem(productId);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1200);
      }}
    >
      <ShoppingBag size={15} className="sm:h-[17px] sm:w-[17px]" />
      {added ? "담김" : label}
    </button>
  );
}
