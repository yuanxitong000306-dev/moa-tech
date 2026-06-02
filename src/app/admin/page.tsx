import Link from "next/link";
import { AdminShell } from "@/app/admin/AdminShell";
import { getAdminCategories, getAdminOrders, getAdminProducts, getAdminProfiles } from "@/lib/admin-data";

export const metadata = {
  title: "后台首页 | MOA TECH"
};

export default async function AdminHomePage() {
  const [categories, products, orders, profiles] = await Promise.all([
    getAdminCategories(),
    getAdminProducts(),
    getAdminOrders(),
    getAdminProfiles()
  ]);

  return (
    <AdminShell>
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Dashboard</p>
          <h1 className="mt-2 text-3xl font-black text-ink">后台首页</h1>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <Link href="/admin/products" className="rounded-lg border border-line bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
            <p className="text-sm font-bold text-gray-500">商品数量</p>
            <p className="mt-3 text-4xl font-black text-ink">{products.length}</p>
          </Link>
          <Link href="/admin/categories" className="rounded-lg border border-line bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
            <p className="text-sm font-bold text-gray-500">分类数量</p>
            <p className="mt-3 text-4xl font-black text-ink">{categories.length}</p>
          </Link>
          <Link href="/admin/orders" className="rounded-lg border border-line bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
            <p className="text-sm font-bold text-gray-500">订单数量</p>
            <p className="mt-3 text-4xl font-black text-ink">{orders.length}</p>
          </Link>
          <Link href="/admin/customers" className="rounded-lg border border-line bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
            <p className="text-sm font-bold text-gray-500">注册用户数量</p>
            <p className="mt-3 text-4xl font-black text-ink">{profiles.length}</p>
          </Link>
        </div>
      </main>
    </AdminShell>
  );
}
