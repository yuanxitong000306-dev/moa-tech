import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { ProductExplorer } from "@/components/ProductExplorer";
import { SectionHeader } from "@/components/SectionHeader";
import { categories } from "@/lib/categories";
import { getAllProducts } from "@/lib/products";
import { getHomeHeroSettings } from "@/lib/site-settings";

const brandNames = ["Apple", "Anker", "Baseus", "UGREEN", "ESR", "Ringke"];

export default async function HomePage() {
  const [allProducts, heroSettings] = await Promise.all([getAllProducts(), getHomeHeroSettings()]);
  const hotProducts = allProducts.filter((product) => product.isHot).slice(0, 4);
  const newProducts = allProducts.filter((product) => product.isNew).slice(0, 4);
  const brandPickProducts = allProducts
    .filter((product) => ["Apple", "Anker", "Baseus", "UGREEN", "ESR", "Ringke", "B&O"].includes(product.brand))
    .slice(0, 4);

  return (
    <main className="bg-white">
      <section className="px-4 py-6 lg:px-8 lg:py-8">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[24px] border border-line bg-white shadow-soft lg:min-h-[520px] lg:grid-cols-[0.88fr_1.12fr]">
          <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
            <p className="text-sm font-bold text-ink/80">프리미엄 모바일 액세서리 전문점</p>
            <h1 className="mt-5 max-w-lg text-4xl font-black leading-[1.05] tracking-[-0.03em] text-ink sm:text-5xl lg:text-6xl">
              {heroSettings.heroTitle.split("\n").map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-md text-base font-semibold leading-7 text-gray-600 sm:text-lg">
              {heroSettings.heroSubtitle.split("\n").map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <div className="mt-8">
              <Link
                href={heroSettings.heroButtonUrl}
                className="inline-flex h-12 items-center gap-2 rounded-lg bg-ink px-6 text-sm font-black text-white shadow-[0_12px_30px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5 hover:bg-gray-800"
              >
                {heroSettings.heroButtonText}
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center bg-[#f7f4ef] p-4 sm:p-6 lg:p-6">
            <div className="relative h-[330px] w-full overflow-hidden rounded-[24px] bg-white shadow-[0_24px_70px_rgba(0,0,0,0.14)] sm:h-[420px] lg:h-[480px]">
              <Image
                src={heroSettings.heroImageUrl}
                alt="Apple 데스크 셋업"
                fill
                priority
                className="object-cover object-center"
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 pt-10 lg:px-8 lg:pb-16 lg:pt-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-lg font-black tracking-tight text-ink">BRAND</p>
              <p className="mt-1 text-sm font-semibold text-gray-500">인기 브랜드를 만나보세요</p>
            </div>
            <Link href="#all-products" className="hidden items-center gap-2 text-sm font-bold text-gray-500 hover:text-ink sm:inline-flex">
              전체 보기 <ArrowRight size={16} />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {brandNames.map((brand) => (
              <Link
                key={brand}
                href={`/?brand=${encodeURIComponent(brand)}#product-results`}
                className="flex min-w-[150px] items-center justify-center rounded-2xl border border-line bg-white px-7 py-5 text-lg font-black text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-ink hover:shadow-soft"
              >
                {brand}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="hot" className="mx-auto max-w-7xl px-4 pb-12 lg:px-8">
        <SectionHeader
          eyebrow="BEST SELLERS"
          title="베스트 상품"
          description="고객들이 가장 많이 찾는 MOA TECH 인기 상품입니다."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {hotProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section id="new" className="bg-mist/80">
        <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
          <SectionHeader
            eyebrow="NEW ARRIVALS"
            title="신상품"
            description="새롭게 입고된 프리미엄 모바일 액세서리를 확인하세요."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <SectionHeader
          eyebrow="BRAND PICK"
          title="브랜드 추천"
          description="검증된 브랜드의 대표 상품만 엄선했습니다."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {brandPickProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section id="categories" className="border-y border-line bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
          <SectionHeader
            eyebrow="CATEGORIES"
            title="필요한 액세서리를 빠르게 찾기"
            description="카테고리별로 원하는 모바일 기어를 쉽게 둘러보세요."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className="group flex items-center gap-4 rounded-xl border border-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-ink hover:shadow-soft"
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

      <section id="all-products" className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <SectionHeader
          eyebrow="SEARCH & FILTER"
          title="상품 검색"
          description="브랜드, 카테고리, 키워드로 원하는 상품을 찾아보세요."
        />
        <ProductExplorer products={allProducts} />
      </section>
    </main>
  );
}
