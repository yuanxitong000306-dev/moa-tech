import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { getAllProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

type ProductsPageProps = {
  searchParams?: {
    brand?: string;
    tag?: string;
  };
};

function normalize(value?: string) {
  return (value ?? "").trim().toLowerCase();
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const products = await getAllProducts();
  const brand = searchParams?.brand;
  const tag = normalize(searchParams?.tag);
  const normalizedBrand = normalize(brand);

  const filteredProducts = products.filter((product) => {
    if (normalizedBrand) {
      return product.brand.toLowerCase() === normalizedBrand;
    }

    if (tag === "best") {
      return product.isHot;
    }

    if (tag === "new") {
      return product.isNew;
    }

    return true;
  });

  const title = brand ? `${brand} 상품` : tag === "best" ? "베스트 상품" : tag === "new" ? "신상품" : "전체 상품";
  const description = brand
    ? `인기 ${brand} 제품을 만나보세요.`
    : "MOA TECH에서 엄선한 모바일 액세서리를 확인해보세요.";

  return (
    <main className="bg-white">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:py-12 lg:px-8">
        <Link href="/#brands" className="inline-flex items-center gap-2 text-sm font-black text-gray-500 transition hover:text-ink">
          <ArrowLeft size={16} />
          홈으로
        </Link>

        <div className="mt-8 flex flex-col gap-3 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-[-0.03em] text-ink sm:text-5xl">{title}</h1>
            <p className="mt-3 text-sm font-semibold text-gray-500 sm:text-base">{description}</p>
          </div>
          <p className="text-sm font-black text-gray-400">{filteredProducts.length} items</p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-3xl border border-line bg-[#F7F8FA] px-6 py-16 text-center">
            <p className="text-lg font-black text-ink">준비 중인 상품입니다.</p>
            <p className="mt-2 text-sm font-semibold text-gray-500">곧 더 많은 브랜드 제품을 소개할게요.</p>
          </div>
        )}
      </section>
    </main>
  );
}
