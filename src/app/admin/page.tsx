import Link from "next/link";
import { AdminShell } from "@/app/admin/AdminShell";
import { getAdminDashboardStats } from "@/lib/admin-data";
import { formatPrice } from "@/lib/products";

export const metadata = {
  title: "后台首页 | MOA TECH"
};

type StatItem = {
  label: string;
  key: keyof Awaited<ReturnType<typeof getAdminDashboardStats>>;
  href: string;
  money?: boolean;
};

const statLinks: StatItem[] = [
  { label: "注册会员数", key: "memberCount", href: "/admin/customers" },
  { label: "今日注册数", key: "todayMemberCount", href: "/admin/customers" },
  { label: "订单总数", key: "orderCount", href: "/admin/orders" },
  { label: "今日订单数", key: "todayOrderCount", href: "/admin/orders" },
  { label: "商品数量", key: "productCount", href: "/admin/products" },
  { label: "总销售额", key: "totalSales", href: "/admin/orders", money: true }
];

export default async function AdminHomePage() {
  const stats = await getAdminDashboardStats();

  return (
    <AdminShell>
      <main className="px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Dashboard</p>
            <h1 className="mt-2 text-3xl font-black text-ink">后台首页</h1>
            <p className="mt-3 text-sm font-semibold text-gray-500">查看商城运营数据和常用管理入口。</p>
          </div>

          <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
            {statLinks.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="rounded-2xl border border-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft"
              >
                <p className="text-sm font-bold text-gray-500">{item.label}</p>
                <p className="mt-4 text-2xl font-black tracking-tight text-ink">
                  {item.money ? formatPrice(stats[item.key]) : stats[item.key]}
                </p>
              </Link>
            ))}
          </section>

          <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Link href="/admin/products" className="rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
              <p className="text-lg font-black text-ink">商品管理</p>
              <p className="mt-2 text-sm leading-6 text-gray-500">新增、编辑、删除商品并上传商品图片。</p>
            </Link>
            <Link href="/admin/orders" className="rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
              <p className="text-lg font-black text-ink">订单管理</p>
              <p className="mt-2 text-sm leading-6 text-gray-500">查看订单、会员信息和商品明细。</p>
            </Link>
            <Link href="/admin/customers" className="rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
              <p className="text-lg font-black text-ink">会员管理</p>
              <p className="mt-2 text-sm leading-6 text-gray-500">查看注册会员资料和订单数量。</p>
            </Link>
            <Link href="/admin/home-settings" className="rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
              <p className="text-lg font-black text-ink">首页设置</p>
              <p className="mt-2 text-sm leading-6 text-gray-500">更换首页 Banner 图片与文案。</p>
            </Link>
          </section>
        </div>
      </main>
    </AdminShell>
  );
}
