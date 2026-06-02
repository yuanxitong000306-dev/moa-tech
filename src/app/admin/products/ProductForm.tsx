import type { AdminCategory, AdminProduct } from "@/lib/admin-data";
import { saveProductAction } from "@/app/admin/products/actions";

type ProductFormProps = {
  categories: AdminCategory[];
  product?: AdminProduct;
};

export function ProductForm({ categories, product }: ProductFormProps) {
  const selectedCategory = product?.category_id ?? categories[0]?.id ?? "";

  return (
    <form action={saveProductAction} className="grid gap-4 rounded-lg border border-line bg-white p-5 shadow-sm">
      <input type="hidden" name="original_id" defaultValue={product?.id ?? ""} />
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-gray-600">
          商品名称
          <input name="name" required defaultValue={product?.name ?? ""} className="h-11 rounded-md border border-line px-3 outline-none focus:border-ink" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-gray-600">
          商品 Slug
          <input name="slug" required defaultValue={product?.slug ?? ""} className="h-11 rounded-md border border-line px-3 outline-none focus:border-ink" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-gray-600">
          品牌
          <input name="brand" required defaultValue={product?.brand ?? ""} className="h-11 rounded-md border border-line px-3 outline-none focus:border-ink" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-gray-600">
          价格 KRW
          <input name="price" type="number" min="0" defaultValue={product?.price ?? 0} className="h-11 rounded-md border border-line px-3 outline-none focus:border-ink" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-gray-600">
          分类
          <select name="category_id" defaultValue={selectedCategory} className="h-11 rounded-md border border-line px-3 outline-none focus:border-ink">
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-gray-600">
          分类显示名
          <input name="category_name" required defaultValue={product?.category_name ?? categories[0]?.name ?? ""} className="h-11 rounded-md border border-line px-3 outline-none focus:border-ink" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-gray-600">
          标签
          <input name="badge" defaultValue={product?.badge ?? "NEW"} className="h-11 rounded-md border border-line px-3 outline-none focus:border-ink" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-gray-600">
          当前图片 URL
          <input name="image_url" defaultValue={product?.image_url ?? ""} className="h-11 rounded-md border border-line px-3 outline-none focus:border-ink" />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-bold text-gray-600">
        上传商品图片
        <input name="image_file" type="file" accept="image/*" className="rounded-md border border-line bg-white px-3 py-2" />
      </label>

      <label className="grid gap-2 text-sm font-bold text-gray-600">
        简短描述
        <textarea name="short_description" required defaultValue={product?.short_description ?? ""} rows={3} className="rounded-md border border-line px-3 py-2 outline-none focus:border-ink" />
      </label>

      <label className="grid gap-2 text-sm font-bold text-gray-600">
        规格（一行一条）
        <textarea name="specs" defaultValue={(product?.specs ?? []).join("\n")} rows={6} className="rounded-md border border-line px-3 py-2 outline-none focus:border-ink" />
      </label>

      <label className="grid gap-2 text-sm font-bold text-gray-600">
        配送说明
        <textarea name="delivery" defaultValue={product?.delivery ?? ""} rows={3} className="rounded-md border border-line px-3 py-2 outline-none focus:border-ink" />
      </label>

      <div className="flex flex-wrap gap-4 text-sm font-bold text-gray-600">
        <label className="inline-flex items-center gap-2">
          <input name="is_hot" type="checkbox" defaultChecked={product?.is_hot ?? false} />
          热销商品
        </label>
        <label className="inline-flex items-center gap-2">
          <input name="is_new" type="checkbox" defaultChecked={product?.is_new ?? true} />
          新品上架
        </label>
      </div>

      <button type="submit" className="h-11 rounded-md bg-ink px-5 text-sm font-black text-white transition hover:bg-gray-800">
        {product ? "保存修改" : "新增商品"}
      </button>
    </form>
  );
}
