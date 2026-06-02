import Image from "next/image";
import Link from "next/link";
import { AdminBackLink } from "@/app/admin/AdminBackLink";
import { AdminShell } from "@/app/admin/AdminShell";
import { getAdminOrders } from "@/lib/admin-data";
import { formatPrice } from "@/lib/products";

export const metadata = {
  title: "订单管理 | MOA TECH"
};

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders();

  return (
    <AdminShell>
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <AdminBackLink />
        <div className="mt-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Orders</p>
          <h1 className="mt-2 text-3xl font-black text-ink">订单管理</h1>
          <p className="mt-3 text-sm leading-6 text-gray-500">
            查看订单、会员信息和每个订单的商品明细。
          </p>
        </div>

        <section className="mt-8 grid gap-5">
          {orders.map((order) => (
            <article key={order.id} className="rounded-lg border border-line bg-white p-5 shadow-sm">
              <div className="grid gap-5 xl:grid-cols-[260px_1fr_180px]">
                <div>
                  <Link href={`/admin/orders/${order.id}`} className="text-base font-black text-ink hover:underline">
                    {order.order_number}
                  </Link>
                  <dl className="mt-4 grid gap-2 text-sm">
                    <div>
                      <dt className="font-bold text-gray-500">用户邮箱</dt>
                      <dd className="mt-1 text-gray-700">{order.profile?.email || order.customer_email || "-"}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-gray-500">用户姓名</dt>
                      <dd className="mt-1 text-gray-700">{order.profile?.name || order.profile?.full_name || order.customer_name || "-"}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-gray-500">手机号</dt>
                      <dd className="mt-1 text-gray-700">{order.profile?.phone || order.customer_phone || "-"}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-gray-500">收货地址</dt>
                      <dd className="mt-1 text-gray-700">{order.profile?.address || order.profile?.shipping_address || order.shipping_address || "-"}</dd>
                    </div>
                  </dl>
                </div>

                <div className="grid gap-3">
                  {(order.order_items ?? []).slice(0, 3).map((item, index) => (
                    <div key={`${item.product_id}-${index}`} className="flex items-center gap-3 rounded-md bg-mist p-3">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-white">
                        {item.product_image_url ? (
                          <Image src={item.product_image_url} alt={item.product_name} fill className="object-contain p-1" sizes="56px" />
                        ) : null}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-black text-ink">{item.product_name}</p>
                        <p className="mt-1 text-xs font-bold text-gray-500">{item.product_brand} · {item.product_slug}</p>
                        <p className="mt-1 text-xs text-gray-500">
                          {formatPrice(item.unit_price)} × {item.quantity} = <span className="font-black text-ink">{formatPrice(item.subtotal_amount)}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                  {(order.order_items ?? []).length > 3 ? (
                    <p className="text-sm font-bold text-gray-500">另有 {(order.order_items ?? []).length - 3} 个商品</p>
                  ) : null}
                  {(order.order_items ?? []).length === 0 ? (
                    <p className="rounded-md bg-mist p-4 text-sm font-bold text-gray-500">暂无商品明细</p>
                  ) : null}
                </div>

                <div className="flex flex-col justify-between gap-4 xl:items-end">
                  <div className="grid gap-2 text-sm xl:text-right">
                    <p className="font-bold text-gray-500">订单状态</p>
                    <p className="font-black text-ink">{order.status}</p>
                    <p className="mt-3 font-bold text-gray-500">总金额</p>
                    <p className="text-xl font-black text-ink">{formatPrice(order.total_amount)}</p>
                    <p className="mt-3 text-gray-500">{new Date(order.created_at).toLocaleString("zh-CN")}</p>
                  </div>
                  <Link href={`/admin/orders/${order.id}`} className="inline-flex h-10 items-center justify-center rounded-md border border-line px-4 text-sm font-black text-gray-600 transition hover:border-ink hover:text-ink">
                    查看详情
                  </Link>
                </div>
              </div>
            </article>
          ))}

          {orders.length === 0 ? (
            <div className="rounded-lg border border-line bg-white p-10 text-center text-gray-500 shadow-sm">
              暂无订单
            </div>
          ) : null}
        </section>
      </main>
    </AdminShell>
  );
}
