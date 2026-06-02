import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AddToCartButton } from "@/components/AddToCartButton";
import { formatPrice, type Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
};

function getDisplayBadge(product: Product) {
  if (product.isHot) {
    return "BEST";
  }
  if (product.isNew) {
    return "NEW";
  }
  return product.badge || "PICK";
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition hover:-translate-y-1 hover:border-gray-300 hover:shadow-soft">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] bg-[#F7F8FA]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-7 transition duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          />
          <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1 text-xs font-black text-white shadow-sm">
            {getDisplayBadge(product)}
          </span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Link href={`/products/${product.slug}`} className="block">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-gray-500">{product.brand}</p>
              <h3 className="mt-2 min-h-[56px] text-base font-black leading-6 text-ink">{product.name}</h3>
            </div>
            <ArrowUpRight className="mt-1 shrink-0 text-gray-300 transition group-hover:text-ink" size={18} />
          </div>
          <p className="mt-3 line-clamp-2 min-h-[42px] text-sm leading-5 text-gray-500">{product.shortDescription}</p>
          <p className="mt-auto pt-5 text-xl font-black text-ink">{formatPrice(product.price)}</p>
        </Link>
        <div className="mt-4">
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </article>
  );
}
