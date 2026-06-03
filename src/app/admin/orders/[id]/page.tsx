import Image from "next/image";
import { notFound } from "next/navigation";
import { AdminBackLink } from "@/app/admin/AdminBackLink";
import { AdminShell } from "@/app/admin/AdminShell";
import { getAdminOrderById } from "@/lib/admin-data";
import { formatPrice } from "@/lib/products";

type AdminOrderDetailPageProps = {
  params: {
    id: string;
  };
};

export const metadata = {
  title: "订单详情 | MOA TECH"
};

export const dynamic = "force-dynamic";

export default async function AdminOrderDetailPage({ params }: AdminOrderDetailPageProps) {
  const order = await getAdminOrderById(params.id);

  if (!order) {
    notFound();
  }

  return (
    <AdminShell>
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <AdminBackLink />
        <div className="mt-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Order Detail</p>
            <h1 className="mt-2 text-3xl font-black text-ink">订单详情</h1>
            <p className="mt-3 text-sm leading-6 text-gray-500">{order.order_number}</p>
          </div>
          <div className="rounded-lg border border-line bg-white px-5 py-4 text-right shadow-sm">
            <p className="text-sm font-bold text-gray-500">总金额</p>
            <p className="mt-1 text-2xl font-black text-ink">{formatPrice(order.total_amount)}</p>
          </div>
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr]">
          <div className="rounded-lg border border-line bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black text-ink">会员与收货信息</h2>
            <dl className="mt-5 grid gap-3 text-sm">
              <div>
                <dt className="font-bold text-gray-500">用户邮箱</dt>
                <dd className="mt-1 font-black text-ink">{order.profile?.email || order.customer_email || "-"}</dd>
              </div>
              <div>
                <dt className="font-bold text-gray-500">用户姓名</dt>
                <dd className="mt-1 font-black text-ink">{order.profile?.name || order.profile?.full_name || order.customer_name || "-"}</dd>
              </div>
              <div>
                <dt className="font-bold text-gray-500">手机号</dt>
                <dd className="mt-1 font-black text-ink">{order.profile?.phone || order.customer_phone || "-"}</dd>
              </div>
              <div>
                <dt className="font-bold text-gray-500">收货地址</dt>
                <dd className="mt-1 font-black text-ink">{order.profile?.address || order.profile?.shipping_address || order.shipping_address || "-"}</dd>
              </div>
              <div>
                <dt className="font-bold text-gray-500">订单状态</dt>
                <dd className="mt-1 font-black text-ink">{order.status}</dd>
              </div>
              <div>
                <dt className="font-bold text-gray-500">下单时间</dt>
                <dd className="mt-1 font-black text-ink">{new Date(order.created_at).toLocaleString("zh-CN")}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-lg border border-line bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black text-ink">商品明细</h2>
            <div className="mt-5 grid gap-4">
              {(order.order_items ?? []).map((item, index) => (
                <article key={`${item.product_id}-${index}`} className="grid gap-4 rounded-lg border border-line p-4 md:grid-cols-[64px_1fr_auto]">
                  <div className="relative h-16 w-16 overflow-hidden rounded-md bg-mist">
                    {item.product_image_url ? (
                      <Image src={item.product_image_url} alt={item.product_name} fill className="object-contain p-1" sizes="64px" />
                    ) : null}
                  </div>
                  <div>
                    <p className="text-base font-black text-ink">{item.product_name}</p>
                    <p className="mt-1 text-sm font-bold text-gray-500">{item.product_brand}</p>
                    <p className="mt-1 text-xs text-gray-500">SKU / slug: {item.product_slug}</p>
                  </div>
                  <div className="text-sm md:text-right">
                    <p className="font-bold text-gray-500">单价</p>
                    <p className="font-black text-ink">{formatPrice(item.unit_price)}</p>
                    <p className="mt-2 font-bold text-gray-500">数量</p>
                    <p className="font-black text-ink">{item.quantity}</p>
                    <p className="mt-2 font-bold text-gray-500">小计</p>
                    <p className="text-lg font-black text-ink">{formatPrice(item.subtotal_amount)}</p>
                  </div>
                </article>
              ))}
              {(order.order_items ?? []).length === 0 ? (
                <p className="rounded-md bg-mist p-8 text-center text-sm font-bold text-gray-500">暂无商品明细</p>
              ) : null}
            </div>
          </div>
        </section>
      </main>
    </AdminShell>
  );
}
