import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { getAllProducts, type Product } from "@/lib/products";
import { getHomeHeroSettings } from "@/lib/site-settings";

const brandSections = [
  {
    name: "Apple",
    query: "Apple",
    description: "인기 Apple 액세서리를 만나보세요."
  },
  {
    name: "Anker",
    query: "Anker",
    description: "인기 Anker 충전 제품을 만나보세요."
  },
  {
    name: "Baseus",
    query: "Baseus",
    description: "인기 Baseus 모바일 기어를 만나보세요."
  },
  {
    name: "UGREEN",
    query: "UGREEN",
    description: "인기 UGREEN 액세서리를 만나보세요."
  },
  {
    name: "ESR",
    query: "ESR",
    description: "인기 ESR 보호 액세서리를 만나보세요."
  },
  {
    name: "Ringke",
    query: "Ringke",
    description: "인기 Ringke 케이스를 만나보세요."
  },
  {
    name: "CASETiFY",
    query: "CASETiFY",
    aliases: ["CASETiFY", "casetify"],
    description: "인기 CASETiFY 케이스를 만나보세요."
  }
];

function productsForBrand(products: Product[], brand: (typeof brandSections)[number]) {
  const aliases = brand.aliases ?? [brand.query];

  return products
    .filter((product) => aliases.some((alias) => product.brand.toLowerCase() === alias.toLowerCase()))
    .slice(0, 5);
}

export default async function HomePage() {
  const [allProducts, heroSettings] = await Promise.all([getAllProducts(), getHomeHeroSettings()]);

  return (
    <main className="bg-white">
      <section className="px-3 py-4 sm:px-4 sm:py-6 lg:px-8 lg:py-8">
        <div className="relative mx-auto h-[460px] max-w-7xl overflow-hidden rounded-[24px] border border-line bg-[#eee7dc] shadow-soft sm:h-[540px] lg:h-[620px]">
          <Image
            src={heroSettings.heroImageUrl}
            alt="MOA TECH 프리미엄 모바일 액세서리"
            fill
            priority
            className="object-cover object-center"
            sizes="(min-width: 1280px) 1280px, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f7efe4]/95 via-[#f7efe4]/55 to-transparent" />
          <div className="relative z-10 flex h-full items-center px-6 sm:px-10 lg:px-16">
            <div className="max-w-[75%] sm:max-w-[520px] lg:max-w-[40%]">
              <p className="text-xs font-bold text-ink/80 sm:text-sm lg:text-base">프리미엄 모바일 액세서리 전문점</p>
              <h1 className="mt-4 text-4xl font-black leading-[1.04] tracking-[-0.04em] text-ink sm:mt-5 sm:text-5xl lg:mt-6 lg:text-7xl">
                {heroSettings.heroTitle.split("\n").map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
              <p className="mt-5 text-base font-semibold leading-7 text-gray-600 sm:text-lg lg:mt-7 lg:text-xl lg:leading-8">
                {heroSettings.heroSubtitle.split("\n").map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <div className="mt-6 lg:mt-9">
                <Link
                  href={heroSettings.heroButtonUrl}
                  className="inline-flex h-12 items-center gap-3 rounded-xl bg-ink px-5 text-[15px] font-black text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:bg-gray-800 sm:px-6 sm:text-base lg:h-14 lg:px-7"
                >
                  {heroSettings.heroButtonText}
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="brands" className="px-4 pb-16 pt-10 sm:pb-20 sm:pt-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 sm:mb-12">
            <p className="text-2xl font-black tracking-[-0.03em] text-ink sm:text-3xl">BRANDS</p>
            <p className="mt-2 text-sm font-semibold text-gray-500 sm:text-base">인기 브랜드 제품을 만나보세요.</p>
          </div>

          <div className="space-y-14 sm:space-y-18">
            {brandSections.map((brand) => {
              const brandProducts = productsForBrand(allProducts, brand);

              return (
                <section key={brand.name} className="border-b border-line pb-12 last:border-b-0 last:pb-0">
                  <div className="mb-5 flex items-end justify-between gap-4 sm:mb-6">
                    <div>
                      <h2 className="text-2xl font-black tracking-[-0.03em] text-ink sm:text-3xl">{brand.name}</h2>
                      <p className="mt-2 text-sm font-semibold leading-6 text-gray-500">{brand.description}</p>
                    </div>
                    <Link
                      href={`/products?brand=${encodeURIComponent(brand.query)}`}
                      className="inline-flex shrink-0 items-center gap-1 text-xs font-black text-gray-500 transition hover:text-ink sm:text-sm"
                    >
                      전체보기 <ArrowRight size={15} />
                    </Link>
                  </div>

                  {brandProducts.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
                      {brandProducts.map((product) => (
                        <ProductCard key={`${brand.name}-${product.id}`} product={product} />
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-3xl border border-dashed border-line bg-[#FAFAFA] px-6 py-10 text-sm font-bold text-gray-400">
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
