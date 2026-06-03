import Image from "next/image";
import { AdminShell } from "@/app/admin/AdminShell";
import { ProductForm } from "@/app/admin/products/ProductForm";
import { deleteProductAction } from "@/app/admin/products/actions";
import { getAdminCategories, getAdminProducts } from "@/lib/admin-data";
import { formatPrice } from "@/lib/products";

export const metadata = {
  title: "商品管理 | MOA TECH"
};

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const [categories, products] = await Promise.all([getAdminCategories(), getAdminProducts()]);

  return (
    <AdminShell>
      <main className="px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Products</p>
              <h1 className="mt-2 text-3xl font-black text-ink">商品管理</h1>
              <p className="mt-3 text-sm leading-6 text-gray-500">
                支持新增、编辑、删除商品，并上传商品图片到 Supabase Storage。
              </p>
            </div>
            <p className="rounded-lg bg-white px-4 py-2 text-sm font-black text-gray-600 shadow-sm">
              共 {products.length} 件商品
            </p>
          </div>

          <section className="mt-8">
            <details className="rounded-2xl border border-line bg-white p-5 shadow-sm">
              <summary className="cursor-pointer text-lg font-black text-ink">新增商品</summary>
              <div className="mt-5">
                <ProductForm categories={categories} />
              </div>
            </details>
          </section>

          <section className="mt-8 grid gap-5">
            {products.map((product) => (
              <article key={product.id} className="rounded-2xl border border-line bg-white p-5 shadow-sm">
                <div className="grid gap-5 lg:grid-cols-[140px_1fr_auto]">
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-mist">
                    {product.image_url ? (
                      <Image src={product.image_url} alt={product.name} fill className="object-cover" sizes="140px" />
                    ) : null}
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-accent">{product.brand}</p>
                    <h2 className="mt-2 text-xl font-black text-ink">{product.name}</h2>
                    <p className="mt-2 text-sm text-gray-500">{product.category_name}</p>
                    <p className="mt-3 text-lg font-black text-ink">{formatPrice(product.price)}</p>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">{product.short_description}</p>
                  </div>
                  <form action={deleteProductAction}>
                    <input type="hidden" name="id" value={product.id} />
                    <button className="rounded-lg border border-red-200 px-4 py-2 text-sm font-black text-red-600 transition hover:bg-red-50">
                      删除
                    </button>
                  </form>
                </div>
                <details className="mt-5 rounded-xl bg-mist p-4">
                  <summary className="cursor-pointer text-sm font-black text-ink">编辑商品</summary>
                  <div className="mt-4">
                    <ProductForm categories={categories} product={product} />
                  </div>
                </details>
              </article>
            ))}
          </section>
        </div>
      </main>
    </AdminShell>
  );
}
