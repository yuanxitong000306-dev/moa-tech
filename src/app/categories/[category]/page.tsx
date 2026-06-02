import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { getCategory, categories } from "@/lib/categories";
import { getProductsByCategoryAsync } from "@/lib/products";

type CategoryPageProps = {
  params: {
    category: string;
  };
};

export function generateStaticParams() {
  return categories.map((category) => ({
    category: category.id
  }));
}

export function generateMetadata({ params }: CategoryPageProps) {
  const category = getCategory(params.category);

  return {
    title: category ? `${category.name} | MOA TECH` : "카테고리 | MOA TECH"
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategory(params.category);

  if (!category) {
    notFound();
  }

  const categoryProducts = await getProductsByCategoryAsync(category.id);
  const Icon = category.icon;

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 transition hover:text-ink">
        <ArrowLeft size={17} />
        홈으로 돌아가기
      </Link>
      <section className="mt-8 rounded-lg border border-line bg-white p-6 shadow-soft md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-md bg-ink text-white">
              <Icon size={26} />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Category</p>
              <h1 className="mt-2 text-3xl font-black text-ink md:text-4xl">{category.name}</h1>
              <p className="mt-3 max-w-2xl leading-7 text-gray-600">{category.description}</p>
            </div>
          </div>
          <p className="rounded-md bg-mist px-4 py-2 text-sm font-black text-ink">{categoryProducts.length}개 상품</p>
        </div>
      </section>

      <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categoryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
