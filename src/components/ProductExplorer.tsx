"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { categories } from "@/lib/categories";
import type { Product } from "@/lib/products";

type ProductExplorerProps = {
  products: Product[];
};

export function ProductExplorer({ products }: ProductExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [activeBrand, setActiveBrand] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const brand = params.get("brand");
    if (brand) {
      setQuery(brand);
      setCategory("all");
      setActiveBrand(brand);
      window.setTimeout(() => {
        const target = document.getElementById("product-results");
        if (target) {
          window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 132, behavior: "auto" });
        }
      }, 0);
    }
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = category === "all" || product.category === category;
      const searchableText = [
        product.name,
        product.brand,
        product.categoryName,
        product.shortDescription,
        ...product.specs
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [category, products, query]);

  return (
    <div className="rounded-2xl border border-line bg-white p-3 shadow-soft sm:p-4 md:p-6">
      <div className="grid gap-3 lg:grid-cols-[1fr_260px]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={19} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="상품명, 브랜드, 키워드 검색"
            className="h-11 w-full rounded-lg border border-line bg-white pl-12 pr-4 text-sm font-semibold outline-none transition focus:border-ink sm:h-12"
          />
        </label>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="h-11 rounded-lg border border-line bg-white px-4 text-sm font-black text-ink outline-none transition focus:border-ink sm:h-12"
        >
          <option value="all">전체 상품</option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {activeBrand ? (
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex rounded-full bg-mist px-3 py-2 text-xs font-black text-ink sm:text-sm">
            브랜드 필터: {activeBrand}
          </span>
        </div>
      ) : null}

      <div className="mt-4 flex flex-nowrap gap-2 overflow-x-auto pb-1 sm:flex-wrap">
        <button
          type="button"
          onClick={() => {
            setCategory("all");
            setActiveBrand("");
          }}
          className={`shrink-0 rounded-full px-3 py-2 text-xs font-black transition sm:px-4 sm:text-sm ${
            category === "all" ? "bg-ink text-white" : "bg-mist text-gray-600 hover:text-ink"
          }`}
        >
          전체
        </button>
        {categories.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setCategory(item.id);
              setActiveBrand("");
            }}
            className={`shrink-0 rounded-full px-3 py-2 text-xs font-black transition sm:px-4 sm:text-sm ${
              category === item.id ? "bg-ink text-white" : "bg-mist text-gray-600 hover:text-ink"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      <p id="product-results" className="mt-5 scroll-mt-32 text-xs font-bold text-gray-500 sm:mt-6 sm:text-sm">
        총 {filteredProducts.length}개 상품
      </p>
      <div className="mt-3 grid grid-cols-2 items-stretch gap-3 sm:mt-4 sm:gap-5 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="mt-6 rounded-xl bg-mist p-8 text-center">
          <p className="font-black text-ink">검색 결과가 없습니다</p>
          <p className="mt-2 text-sm text-gray-500">검색어를 바꾸거나 다른 카테고리를 선택해 주세요.</p>
        </div>
      ) : null}
    </div>
  );
}
