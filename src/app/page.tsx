import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { ProductExplorer } from "@/components/ProductExplorer";
import { SectionHeader } from "@/components/SectionHeader";
import { categories } from "@/lib/categories";
import { getAllProducts } from "@/lib/products";

const serviceItems = [
  "🚚 한국 전역 무료배송",
  "🔒 안전결제",
  "↩ 7일 교환·반품",
  "💬 카카오톡 실시간 상담"
];

export default async function HomePage() {
  const allProducts = await getAllProducts();
  const hotProducts = allProducts.filter((product) => product.isHot).slice(0, 4);
  const newProducts = allProducts.filter((product) => product.isNew).slice(0, 4);

  return (
    <main>
      <section className="bg-gradient-to-b from-mist to-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.05fr_0.95fr] md:items-center lg:px-8 lg:py-14">
          <div>
            <p className="inline-flex rounded-md border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-black tracking-[0.16em] text-accent">
              PREMIUM MOBILE ACCESSORY STORE
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl font-black leading-none tracking-[-0.03em] text-ink md:text-7xl">
              MOA TECH
            </h1>
            <p className="mt-5 text-xl font-black tracking-[-0.01em] text-ink">
              Smart Accessories For Everyday.
            </p>
            <p className="mt-2 max-w-2xl text-base font-bold leading-7 text-gray-600 md:text-lg">
              매일 쓰는 모바일 기어를 더 정교하게.
            </p>
            <p className="mt-6 inline-flex rounded-lg bg-ink px-4 py-3 text-sm font-black text-white md:text-base">
              아이폰 액세서리 최대 30% 할인
            </p>
            <p className="mt-4 text-sm font-black text-gray-500 md:text-base">
              MagSafe · GaN 충전기 · 프리미엄 케이스
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#all-products" className="inline-flex h-12 items-center gap-2 rounded-md bg-ink px-5 text-sm font-black text-white transition hover:bg-gray-800">
                <Search size={18} />
                상품 검색
              </Link>
              <a href="https://pf.kakao.com/" target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2 rounded-md bg-[#FEE500] px-5 text-sm font-black text-[#191919] transition hover:brightness-95">
                Kakao 문의
              </a>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl border border-line bg-white shadow-soft">
            <Image
              src="/products/anker-a1695-real.png"
              alt="Anker A1695 보조배터리"
              width={960}
              height={720}
              priority
              className="h-auto w-full"
            />
          </div>
        </div>
        <div className="mx-auto grid max-w-7xl gap-3 px-4 pb-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {serviceItems.map((item) => (
            <div key={item} className="rounded-lg border border-line bg-white/85 px-4 py-4 text-sm font-black text-ink">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section id="categories" className="border-y border-line bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <SectionHeader
            eyebrow="Categories"
            title="필요한 액세서리를 빠르게 찾기"
            description="카테고리별로 상품을 둘러보거나 전체 상품 영역에서 검색과 필터를 사용할 수 있습니다."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className="group flex items-center gap-4 rounded-lg border border-line bg-white p-5 transition hover:border-ink hover:shadow-soft"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-mist text-ink transition group-hover:bg-ink group-hover:text-white">
                    <Icon size={22} />
                  </span>
                  <span>
                    <span className="block font-black text-ink">{category.name}</span>
                    <span className="mt-1 block text-sm leading-5 text-gray-500">{category.description}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="hot" className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <SectionHeader
          eyebrow="Best Sellers"
          title="지금 가장 인기 있는 상품"
          description="고객 문의와 장바구니 반응이 좋은 상품을 먼저 보여드립니다."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {hotProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section id="new" className="bg-mist">
        <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
          <SectionHeader
            eyebrow="New Arrivals"
            title="새로 입고된 모바일 액세서리"
            description="시즌별로 업데이트되는 신상품과 브랜드 신규 라인업입니다."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section id="all-products" className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <SectionHeader
          eyebrow="Search & Filter"
          title="🔍 상품 검색"
          description="상품명, 브랜드, 사양으로 검색하거나 카테고리로 빠르게 필터링할 수 있습니다."
        />
        <ProductExplorer products={allProducts} />
      </section>
    </main>
  );
}
