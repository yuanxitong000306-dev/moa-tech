import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group h-full">
      <Link href={`/products/${product.slug}`} className="block h-full">
        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_12px_34px_rgba(15,23,42,0.06)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_18px_46px_rgba(15,23,42,0.10)]">
          <div className="relative aspect-square bg-[#F7F8FA]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-4 transition duration-500 group-hover:scale-105 sm:p-6"
              sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, 50vw"
            />
          </div>
          <div className="p-3 sm:p-4">
            <p className="text-[10px] font-black uppercase text-gray-500 sm:text-xs">{product.brand}</p>
            <h3 className="mt-1 line-clamp-2 min-h-[38px] text-xs font-bold leading-5 text-ink sm:min-h-[44px] sm:text-sm sm:leading-5">
              {product.name}
            </h3>
            <p className="mt-2 text-sm font-black text-ink sm:text-base">{formatPrice(product.price)}</p>
          </div>
        </div>
      </Link>
    </article>
  );
}
