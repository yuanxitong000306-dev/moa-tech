import type { AdminCategory } from "@/lib/admin-data";
import { saveCategoryAction } from "@/app/admin/categories/actions";

type CategoryFormProps = {
  category?: AdminCategory;
};

export function CategoryForm({ category }: CategoryFormProps) {
  return (
    <form action={saveCategoryAction} className="grid gap-4 md:grid-cols-2">
      <label className="grid gap-2 text-sm font-bold text-gray-600">
        分类 ID
        <input
          name="id"
          required
          defaultValue={category?.id ?? ""}
          className="h-11 rounded-lg border border-line px-3 outline-none focus:border-ink"
          placeholder="phone-cases"
        />
      </label>
      <label className="grid gap-2 text-sm font-bold text-gray-600">
        分类名称
        <input
          name="name"
          required
          defaultValue={category?.name ?? ""}
          className="h-11 rounded-lg border border-line px-3 outline-none focus:border-ink"
          placeholder="手机壳"
        />
      </label>
      <label className="grid gap-2 text-sm font-bold text-gray-600">
        排序
        <input
          name="sort_order"
          type="number"
          defaultValue={category?.sort_order ?? 0}
          className="h-11 rounded-lg border border-line px-3 outline-none focus:border-ink"
        />
      </label>
      <label className="grid gap-2 text-sm font-bold text-gray-600 md:col-span-2">
        分类说明
        <textarea
          name="description"
          defaultValue={category?.description ?? ""}
          className="min-h-24 rounded-lg border border-line px-3 py-3 outline-none focus:border-ink"
          placeholder="分类说明"
        />
      </label>
      <div className="md:col-span-2">
        <button className="h-11 rounded-lg bg-ink px-5 text-sm font-black text-white transition hover:bg-gray-800">
          保存
        </button>
      </div>
    </form>
  );
}
