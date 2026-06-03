import Link from "next/link";
import {
  Boxes,
  ChartNoAxesCombined,
  FolderTree,
  Home,
  LayoutPanelTop,
  ShoppingBag,
  Store,
  Users
} from "lucide-react";
import { requireAdmin } from "@/lib/admin-auth";
import { SignOutButton } from "@/app/admin/SignOutButton";

const navItems = [
  { href: "/admin", label: "后台首页", icon: Home },
  { href: "/admin/products", label: "商品管理", icon: Boxes },
  { href: "/admin/categories", label: "分类管理", icon: FolderTree },
  { href: "/admin/orders", label: "订单管理", icon: ShoppingBag },
  { href: "/admin/customers", label: "会员管理", icon: Users },
  { href: "/admin/home-settings", label: "首页设置", icon: LayoutPanelTop }
];

export async function AdminShell({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();

  return (
    <div className="min-h-screen bg-mist">
      <style>{`
        .public-site-header,
        .public-site-footer,
        .public-site-widget {
          display: none !important;
        }
      `}</style>

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-line bg-white px-5 py-6 shadow-[12px_0_40px_rgba(0,0,0,0.04)] lg:block">
        <Link href="/admin" className="block">
          <p className="text-2xl font-black tracking-[-0.03em] text-ink">MOA TECH</p>
          <p className="mt-1 text-sm font-black text-gray-500">后台管理系统</p>
        </Link>

        <div className="mt-6 rounded-2xl border border-line bg-mist/70 p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-gray-400">Admin</p>
          <p className="mt-2 truncate text-sm font-black text-ink">{user.email}</p>
        </div>

        <nav className="mt-6 grid gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-black text-gray-600 transition hover:bg-ink hover:text-white"
              >
                <Icon size={18} className="text-gray-400 transition group-hover:text-white" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-5 right-5 grid gap-2">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 text-sm font-black text-gray-600 transition hover:border-ink hover:text-ink"
          >
            <Store size={18} />
            打开前台
          </Link>
          <SignOutButton />
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-line bg-white/90 px-4 py-4 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between gap-4">
            <Link href="/admin" className="text-xl font-black text-ink">
              MOA TECH 后台
            </Link>
            <SignOutButton compact />
          </div>
          <nav className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-full border border-line bg-white px-4 py-2 text-sm font-black text-gray-600"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full border border-line bg-white px-4 py-2 text-sm font-black text-gray-600"
            >
              打开前台
            </Link>
          </nav>
        </header>
        {children}
      </div>
    </div>
  );
}
