"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Minus, Plus, Trash2 } from "lucide-react";
import { createOrderAction } from "@/app/cart/actions";
import { useCart } from "@/components/CartProvider";
import { formatPrice, type Product } from "@/lib/products";

type CartViewProps = {
  products: Product[];
  isSignedIn: boolean;
};

export function CartView({ products, isSignedIn }: CartViewProps) {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const lines = items
    .map((item) => {
      const product = products.find((entry) => entry.id === item.productId);
      return product ? { ...item, product } : null;
    })
    .filter(Boolean) as Array<{ productId: string; quantity: number; product: Product }>;
  const total = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);

  if (lines.length === 0) {
    return (
      <div className="rounded-lg border border-line bg-white p-10 text-center shadow-soft">
        <p className="text-xl font-black text-ink">장바구니가 비어 있습니다</p>
        <p className="mt-3 text-sm text-gray-500">필요한 모바일 액세서리를 담아 주문을 시작해 보세요.</p>
        <Link href="/#all-products" className="mt-6 inline-flex h-12 items-center justify-center rounded-md bg-ink px-5 text-sm font-black text-white">
          상품 보러가기
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="grid gap-4">
        {lines.map(({ product, quantity }) => (
          <article key={product.id} className="grid gap-4 rounded-lg border border-line bg-white p-4 shadow-sm sm:grid-cols-[120px_1fr_auto]">
            <div className="relative aspect-square rounded-md bg-mist">
              <Image src={product.image} alt={product.name} fill className="object-contain p-5" sizes="120px" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.12em] text-accent">{product.brand}</p>
              <Link href={`/products/${product.slug}`} className="mt-2 block text-lg font-black text-ink hover:underline">
                {product.name}
              </Link>
              <p className="mt-2 text-sm text-gray-500">{product.categoryName}</p>
              <p className="mt-4 font-black text-ink">{formatPrice(product.price)}</p>
            </div>
            <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
              <div className="flex h-10 items-center rounded-md border border-line">
                <button type="button" aria-label="수량 줄이기" className="flex h-10 w-10 items-center justify-center" onClick={() => updateQuantity(product.id, quantity - 1)}>
                  <Minus size={16} />
                </button>
                <span className="min-w-8 text-center text-sm font-black">{quantity}</span>
                <button type="button" aria-label="수량 늘리기" className="flex h-10 w-10 items-center justify-center" onClick={() => updateQuantity(product.id, quantity + 1)}>
                  <Plus size={16} />
                </button>
              </div>
              <button
                type="button"
                className="inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-bold text-gray-500 transition hover:bg-mist hover:text-ink"
                onClick={() => removeItem(product.id)}
              >
                <Trash2 size={16} />
                삭제
              </button>
            </div>
          </article>
        ))}
      </div>

      <aside className="h-fit rounded-lg border border-line bg-white p-6 shadow-soft">
        <p className="text-lg font-black text-ink">주문 요약</p>
        <div className="mt-5 space-y-3 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>상품 수량</span>
            <span className="font-black text-ink">{items.reduce((sum, item) => sum + item.quantity, 0)}개</span>
          </div>
          <div className="flex justify-between border-t border-line pt-3">
            <span>총 금액</span>
            <span className="text-xl font-black text-ink">{formatPrice(total)}</span>
          </div>
        </div>

        {isSignedIn ? (
          <form action={createOrderAction} className="mt-6">
            <input type="hidden" name="items" value={JSON.stringify(items)} />
            <button className="h-12 w-full rounded-md bg-ink px-5 text-sm font-black text-white transition hover:bg-gray-800">
              주문하기
            </button>
          </form>
        ) : (
          <Link href="/login?next=/cart" className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-md bg-ink px-5 text-sm font-black text-white">
            주문하기
          </Link>
        )}

        <a
          href="https://pf.kakao.com/"
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#FEE500] px-5 text-sm font-black text-[#191919]"
        >
          <MessageCircle size={18} />
          카카오톡 문의하기
        </a>
        <button type="button" onClick={clearCart} className="mt-3 h-11 w-full rounded-md border border-line text-sm font-black text-gray-600 transition hover:border-ink hover:text-ink">
          장바구니 비우기
        </button>
      </aside>
    </div>
  );
}
