import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/products";

export const metadata = {
  title: "마이페이지 | MOA TECH"
};

type ProfileRow = {
  email?: string | null;
  name?: string | null;
  phone?: string | null;
  address?: string | null;
  full_name?: string | null;
  shipping_address?: string | null;
};

export default async function MyPage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/mypage");
  }

  const [{ data: profile }, { data: orders }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
    supabase.from("orders").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
  ]);

  const profileRow = (profile ?? {}) as ProfileRow;
  const displayName = profileRow.name ?? profileRow.full_name ?? "-";
  const displayAddress = profileRow.address ?? profileRow.shipping_address ?? "-";

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">My Page</p>
        <h1 className="mt-2 text-3xl font-black text-ink md:text-5xl">마이페이지</h1>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr]">
        <section className="h-fit rounded-lg border border-line bg-white p-6 shadow-soft">
          <h2 className="text-lg font-black text-ink">회원 정보</h2>
          <dl className="mt-5 grid gap-3 text-sm">
            <div>
              <dt className="font-bold text-gray-500">이메일</dt>
              <dd className="mt-1 font-black text-ink">{profileRow.email ?? user.email}</dd>
            </div>
            <div>
              <dt className="font-bold text-gray-500">이름</dt>
              <dd className="mt-1 font-black text-ink">{displayName}</dd>
            </div>
            <div>
              <dt className="font-bold text-gray-500">휴대폰 번호</dt>
              <dd className="mt-1 font-black text-ink">{profileRow.phone ?? "-"}</dd>
            </div>
            <div>
              <dt className="font-bold text-gray-500">배송지 주소</dt>
              <dd className="mt-1 font-black text-ink">{displayAddress}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-lg border border-line bg-white p-6 shadow-soft">
          <h2 className="text-lg font-black text-ink">주문 내역</h2>
          <div className="mt-5 grid gap-4">
            {(orders ?? []).map((order) => (
              <article key={order.id} className="rounded-md border border-line p-4">
                <div className="flex flex-col justify-between gap-2 md:flex-row">
                  <div>
                    <p className="text-sm font-black text-ink">{order.order_number}</p>
                    <p className="mt-1 text-xs font-bold text-gray-500">{new Date(order.created_at).toLocaleString("ko-KR")}</p>
                  </div>
                  <div className="text-sm font-black text-ink">{formatPrice(order.total_amount)}</div>
                </div>
                <p className="mt-3 text-sm text-gray-600">주문 상태: {order.status}</p>
              </article>
            ))}
            {(orders ?? []).length === 0 ? (
              <div className="rounded-md bg-mist p-8 text-center text-sm font-bold text-gray-500">
                아직 주문 내역이 없습니다.
                <div className="mt-4">
                  <Link href="/#all-products" className="font-black text-ink">상품 보러가기</Link>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
