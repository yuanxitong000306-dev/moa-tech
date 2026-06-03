import { AdminShell } from "@/app/admin/AdminShell";
import { CategoryForm } from "@/app/admin/categories/CategoryForm";
import { deleteCategoryAction } from "@/app/admin/categories/actions";
import { getAdminCategories } from "@/lib/admin-data";

export const metadata = {
  title: "分类管理 | MOA TECH"
};

export default async function AdminCategoriesPage() {
  const categories = await getAdminCategories();

  return (
    <AdminShell>
      <main className="px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Categories</p>
              <h1 className="mt-2 text-3xl font-black text-ink">分类管理</h1>
              <p className="mt-3 text-sm leading-6 text-gray-500">管理商品分类，支持新增、编辑、删除。</p>
            </div>
            <p className="rounded-lg bg-white px-4 py-2 text-sm font-black text-gray-600 shadow-sm">
              共 {categories.length} 个分类
            </p>
          </div>

          <section className="mt-8">
            <details className="rounded-2xl border border-line bg-white p-5 shadow-sm">
              <summary className="cursor-pointer text-lg font-black text-ink">新增分类</summary>
              <div className="mt-5">
                <CategoryForm />
              </div>
            </details>
          </section>

          <section className="mt-8 grid gap-5">
            {categories.map((category) => (
              <article key={category.id} className="rounded-2xl border border-line bg-white p-5 shadow-sm">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-accent">{category.id}</p>
                    <h2 className="mt-2 text-xl font-black text-ink">{category.name}</h2>
                    <p className="mt-2 text-sm text-gray-500">{category.description || "暂无说明"}</p>
                    <p className="mt-3 text-sm font-bold text-gray-500">排序：{category.sort_order}</p>
                  </div>
                  <form action={deleteCategoryAction}>
                    <input type="hidden" name="id" value={category.id} />
                    <button className="rounded-lg border border-red-200 px-4 py-2 text-sm font-black text-red-600 transition hover:bg-red-50">
                      删除
                    </button>
                  </form>
                </div>
                <details className="mt-5 rounded-xl bg-mist p-4">
                  <summary className="cursor-pointer text-sm font-black text-ink">编辑分类</summary>
                  <div className="mt-4">
                    <CategoryForm category={category} />
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
