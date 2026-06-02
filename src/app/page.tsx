import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle, PackageCheck, RefreshCcw, ShieldCheck } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { ProductExplorer } from "@/components/ProductExplorer";
import { SectionHeader } from "@/components/SectionHeader";
import { categories } from "@/lib/categories";
import { getAllProducts } from "@/lib/products";

const trustItems = [
  { label: "정품 보장", icon: ShieldCheck },
  { label: "빠른 배송", icon: PackageCheck },
  { label: "카카오 상담", icon: MessageCircle },
  { label: "7일 교환/반품", icon: RefreshCcw }
];

const brandNames = ["Apple", "Anker", "Baseus", "UGREEN", "ESR", "Ringke"];

export default async function HomePage() {
  const allProducts = await getAllProducts();
  const hotProducts = allProducts.filter((product) => product.isHot).slice(0, 4);
  const newProducts = allProducts.filter((product) => product.isNew).slice(0, 4);
  const brandPickProducts = allProducts
    .filter((product) => ["Apple", "Anker", "Baseus", "UGREEN", "ESR", "Ringke", "B&O"].includes(product.brand))
    .slice(0, 4);

  return (
    <main className="bg-white">
      <section className="px-4 py-8 lg:px-8 lg:py-12">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-2xl border border-line bg-white shadow-soft lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12 lg:py-16">
            <p className="w-fit rounded-full border border-line bg-mist px-4 py-2 text-xs font-black tracking-[0.18em] text-gray-600">
              PREMIUM MOBILE GEAR
            </p>
            <h1 className="mt-6 max-w-xl text-4xl font-black leading-tight tracking-[-0.03em] text-ink sm:text-5xl lg:text-6xl">
              Smart Life, Better Choice.
            </h1>
            <p className="mt-5 max-w-xl text-base font-bold leading-7 text-gray-600 sm:text-lg">
              검증된 브랜드와 고품질 제품으로 더 스마트한 일상을 경험하세요.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="#all-products"
                className="inline-flex h-12 items-center gap-2 rounded-md bg-ink px-5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-gray-800"
              >
                쇼핑 바로가기
                <ArrowRight size={18} />
              </Link>
              <span className="inline-flex h-12 items-center rounded-md border border-line bg-white px-5 text-sm font-black text-gray-600">
                아이폰 액세서리 최대 30% 할인
              </span>
            </div>
            <p className="mt-5 text-sm font-black text-gray-500">
              MagSafe · GaN 충전기 · 프리미엄 케이스
            </p>
          </div>
          <div className="relative min-h-[320px] bg-mist lg:min-h-[520px]">
            <Image
              src="/products/anker-a1695-real.png"
              alt="Anker 보조배터리"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
            <div className="absolute bottom-5 left-5 rounded-lg bg-white/90 px-4 py-3 shadow-soft backdrop-blur">
              <p className="text-xs font-black tracking-[0.16em] text-gray-500">TODAY PICK</p>
              <p className="mt-1 text-sm font-black text-ink">Anker A1695 90Wh</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-3 rounded-xl border border-line bg-white px-5 py-4 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FEE500] text-[#191919]">
                  <Icon size={19} />
                </span>
                <span className="text-sm font-black text-ink">{item.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-2xl border border-line bg-mist/70 px-5 py-5">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {brandNames.map((brand) => (
              <Link
                key={brand}
                href={`/?brand=${encodeURIComponent(brand)}#product-results`}
                className="rounded-full border border-line bg-white px-5 py-3 text-sm font-black text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:border-ink hover:text-ink hover:shadow-md"
              >
                {brand}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="hot" className="mx-auto max-w-7xl px-4 pb-14 lg:px-8">
        <SectionHeader
          eyebrow="BEST SELLERS"
          title="가장 많이 선택한 제품"
          description="매일 쓰는 모바일 기어 중 만족도가 높은 인기 상품을 모았습니다."
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
            title="새롭게 입고된 액세서리"
            description="최신 디바이스와 잘 어울리는 신상품을 빠르게 만나보세요."
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
          title="브랜드별 추천 상품"
          description="검증된 브랜드의 대표 제품을 MOA TECH 기준으로 선별했습니다."
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
            description="케이스부터 충전기, 보조배터리, 이어폰까지 카테고리별로 정리했습니다."
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
          description="브랜드, 카테고리, 제품명으로 원하는 모바일 액세서리를 찾아보세요."
        />
        <ProductExplorer products={allProducts} />
      </section>
    </main>
  );
}
