/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { getAllProducts, type Product } from "@/lib/products";
import { getHomeHeroSettings } from "@/lib/site-settings";

const heroCopy = {
  title: "Smart Life,\nBetter Choice.",
  button: "쇼핑 바로가기"
};

const brandSections = [
  {
    name: "Apple",
    query: "Apple",
    description: "인기 Apple 액세서리를 만나보세요.",
    logo: "https://appleid.cdn-apple.com/appleid/button/logo?color=white&border=false&size=30&scale=3"
  },
  {
    name: "Anker",
    query: "Anker",
    description: "인기 Anker 충전 제품을 만나보세요.",
    logo: "/brand-logos/anker.svg"
  },
  {
    name: "Baseus",
    query: "Baseus",
    description: "인기 Baseus 모바일 기어를 만나보세요.",
    logo: "/brand-logos/baseus.svg"
  },
  {
    name: "UGREEN",
    query: "UGREEN",
    description: "인기 UGREEN 액세서리를 만나보세요.",
    logo: "/brand-logos/ugreen.svg"
  },
  {
    name: "ESR",
    query: "ESR",
    description: "인기 ESR 보호 액세서리를 만나보세요.",
    logo: "/brand-logos/esr.svg"
  },
  {
    name: "Ringke",
    query: "Ringke",
    description: "인기 Ringke 케이스를 만나보세요.",
    logo: "/brand-logos/ringke.svg"
  },
  {
    name: "CASETiFY",
    query: "CASETiFY",
    aliases: ["CASETiFY", "casetify"],
    description: "인기 CASETiFY 케이스를 만나보세요.",
    logo: "/brand-logos/casetify.svg"
  }
];

function productsForBrand(products: Product[], brand: (typeof brandSections)[number]) {
  const aliases = brand.aliases ?? [brand.query];

  return products
    .filter((product) => aliases.some((alias) => product.brand.toLowerCase() === alias.toLowerCase()))
    .slice(0, 4);
}

function BrandLogo({ brand }: { brand: (typeof brandSections)[number] }) {
  const isApple = brand.name === "Apple";

  return (
    <span className={`block h-[22px] shrink-0 sm:h-[28px] ${isApple ? "w-[22px] sm:w-[30px]" : "w-[86px] sm:w-[112px]"}`}>
      <img src={brand.logo} alt={`${brand.name} logo`} className="h-full w-full object-contain object-left" />
    </span>
  );
}

export default async function HomePage() {
  const [allProducts, heroSettings] = await Promise.all([getAllProducts(), getHomeHeroSettings()]);

  return (
    <main className="bg-white">
      <section className="px-3 pb-5 pt-3 sm:px-4 sm:py-6 lg:px-8 lg:py-8">
        <div className="relative mx-auto h-[280px] max-h-[300px] max-w-7xl overflow-hidden rounded-[20px] border border-line bg-[#eee7dc] shadow-[0_14px_40px_rgba(15,23,42,0.08)] sm:h-[540px] sm:max-h-none sm:rounded-[24px] lg:h-[620px]">
          <Image
            src={heroSettings.heroImageUrl}
            alt="MOA TECH 프리미엄 모바일 액세서리"
            fill
            priority
            className="object-cover object-[62%_center] sm:object-[center_right]"
            sizes="(min-width: 1280px) 1280px, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f7efe4]/95 via-[#f7efe4]/55 to-transparent sm:from-[#f7efe4]/95 sm:via-[#f7efe4]/55" />
          <div className="relative z-10 flex h-full items-center px-5 sm:px-10 lg:px-16">
            <div className="w-[56%] max-w-[230px] sm:w-auto sm:max-w-[520px] lg:max-w-[40%]">
              <p className="text-[24px] font-extrabold tracking-[-0.5px] text-ink sm:text-[34px] lg:text-[44px]">MOA TECH</p>
              <h1 className="mt-[6px] text-[22px] font-semibold leading-[1.2] tracking-[-0.035em] text-ink sm:text-[42px] sm:font-semibold sm:leading-[1.1] lg:text-[52px]">
                <span className="block whitespace-nowrap">Smart Life,</span>
                <span className="block whitespace-nowrap">Better Choice.</span>
              </h1>
              <div className="mt-5 sm:mt-7 lg:mt-9">
                <Link
                  href="#brands"
                  className="inline-flex items-center gap-2 rounded-[10px] bg-ink px-3 py-2 text-[14px] font-black text-white shadow-[0_12px_24px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:bg-gray-800 sm:h-12 sm:px-6 sm:text-base lg:h-14 lg:px-7"
                >
                  {heroCopy.button}
                  <ArrowRight className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="brands" className="px-4 pb-14 pt-2 sm:pb-20 sm:pt-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 sm:mb-10">
            <p className="text-lg font-black tracking-[-0.03em] text-ink sm:text-3xl">BRANDS</p>
            <p className="mt-1 text-[11px] font-semibold text-gray-500 sm:mt-2 sm:text-base">인기 브랜드 제품을 만나보세요.</p>
          </div>

          <div className="space-y-9 sm:space-y-14">
            {brandSections.map((brand) => {
              const brandProducts = productsForBrand(allProducts, brand);

              return (
                <section key={brand.name} className="border-b border-line pb-8 last:border-b-0 last:pb-0 sm:pb-12">
                  <div className="mb-3 flex items-center justify-between gap-3 sm:mb-5">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <BrandLogo brand={brand} />
                        {brand.name === "Apple" ? (
                          <h2 className="truncate text-sm font-black tracking-[-0.02em] text-ink sm:text-2xl">{brand.name}</h2>
                        ) : null}
                      </div>
                      <p className="mt-1 hidden text-sm font-semibold leading-6 text-gray-500 sm:block">{brand.description}</p>
                    </div>
                    <Link
                      href={`/products?brand=${encodeURIComponent(brand.query)}`}
                      className="inline-flex shrink-0 items-center gap-1 text-[10px] font-bold text-gray-500 transition hover:text-ink sm:text-sm sm:font-black"
                    >
                      전체보기 <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Link>
                  </div>

                  {brandProducts.length > 0 ? (
                    <div className="grid grid-cols-4 gap-2 sm:grid-cols-4 sm:gap-5 xl:grid-cols-5">
                      {brandProducts.map((product) => (
                        <ProductCard key={`${brand.name}-${product.id}`} product={product} compact />
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-line bg-[#FAFAFA] px-4 py-6 text-xs font-bold text-gray-400 sm:rounded-3xl sm:px-6 sm:py-10 sm:text-sm">
                      신규 상품을 준비 중입니다.
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
