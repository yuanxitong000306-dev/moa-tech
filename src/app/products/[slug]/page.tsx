import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, MessageCircle, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice, getAllProducts, getProductBySlug, getProductBySlugAsync, products } from "@/lib/products";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug
  }));
}

export function generateMetadata({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  return {
    title: product ? `${product.name} | MOA TECH` : "상품 상세 | MOA TECH"
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlugAsync(params.slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getAllProducts();
  const relatedProducts = allProducts
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <Link href="/#all-products" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 transition hover:text-ink">
        <ArrowLeft size={17} />
        상품 목록으로 돌아가기
      </Link>

      <section className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="overflow-hidden rounded-lg border border-line bg-mist">
          <div className="relative aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-contain p-10 md:p-16"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>

        <div className="rounded-lg border border-line bg-white p-6 shadow-soft md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-ink px-2.5 py-1 text-xs font-black text-white">{product.badge}</span>
            <span className="rounded bg-mist px-2.5 py-1 text-xs font-bold text-gray-600">{product.categoryName}</span>
          </div>
          <p className="mt-6 text-sm font-black uppercase tracking-[0.16em] text-accent">{product.brand}</p>
          <h1 className="mt-3 text-3xl font-black leading-tight text-ink md:text-5xl">{product.name}</h1>
          <p className="mt-4 text-base leading-7 text-gray-600">{product.shortDescription}</p>
          <p className="mt-7 text-3xl font-black text-ink">{formatPrice(product.price)}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-md border border-line p-4">
              <Truck className="text-accent" size={20} />
              <p className="mt-2 text-sm font-black">빠른 배송</p>
            </div>
            <div className="rounded-md border border-line p-4">
              <ShieldCheck className="text-accent" size={20} />
              <p className="mt-2 text-sm font-black">브랜드 정품</p>
            </div>
            <div className="rounded-md border border-line p-4">
              <PackageCheck className="text-accent" size={20} />
              <p className="mt-2 text-sm font-black">문의 주문</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-black text-ink">제품 사양</h2>
            <ul className="mt-4 grid gap-3">
              {product.specs.map((spec) => (
                <li key={spec} className="flex items-start gap-3 text-sm leading-6 text-gray-600">
                  <Check className="mt-1 shrink-0 text-accent" size={16} />
                  {spec}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 rounded-md bg-mist p-5">
            <h2 className="text-lg font-black text-ink">배송 안내</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">{product.delivery}</p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <AddToCartButton
              productId={product.id}
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-md border border-line bg-white px-5 text-base font-black text-ink transition hover:border-ink"
            />
            <a
              href="https://pf.kakao.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-md bg-[#FEE500] px-5 text-base font-black text-[#191919] transition hover:brightness-95"
            >
              <MessageCircle size={20} />
              카카오톡 문의하기
            </a>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="mt-14">
          <div className="mb-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Related</p>
            <h2 className="mt-2 text-2xl font-black text-ink">같은 카테고리 상품</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
