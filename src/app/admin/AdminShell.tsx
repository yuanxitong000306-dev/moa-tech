import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { SignOutButton } from "@/app/admin/SignOutButton";

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
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 lg:px-8">
          <div>
            <Link href="/admin" className="text-2xl font-black tracking-[-0.02em] text-ink">
              MOA TECH 后台
            </Link>
            <p className="mt-1 text-xs font-bold text-gray-500">{user.email}</p>
          </div>
          <nav className="flex items-center gap-2 overflow-x-auto text-sm font-black">
            <Link href="/admin" className="rounded-md px-3 py-2 text-gray-600 transition hover:bg-mist hover:text-ink">
              后台首页
            </Link>
            <Link href="/admin/products" className="rounded-md px-3 py-2 text-gray-600 transition hover:bg-mist hover:text-ink">
              商品管理
            </Link>
            <Link href="/admin/categories" className="rounded-md px-3 py-2 text-gray-600 transition hover:bg-mist hover:text-ink">
              分类管理
            </Link>
            <Link href="/admin/orders" className="rounded-md px-3 py-2 text-gray-600 transition hover:bg-mist hover:text-ink">
              订单管理
            </Link>
            <Link href="/admin/customers" className="rounded-md px-3 py-2 text-gray-600 transition hover:bg-mist hover:text-ink">
              会员管理
            </Link>
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-line bg-white px-3 py-2 text-gray-600 transition hover:border-ink hover:text-ink"
            >
              打开前台
            </Link>
            <SignOutButton />
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
