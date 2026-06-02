import { CartView } from "@/components/CartView";
import { getAllProducts } from "@/lib/products";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = {
  title: "장바구니 | MOA TECH"
};

export default async function CartPage() {
  const products = await getAllProducts();
  let isSignedIn = false;

  try {
    const supabase = createSupabaseServerClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();
    isSignedIn = Boolean(user);
  } catch {}

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Cart</p>
        <h1 className="mt-2 text-3xl font-black text-ink md:text-5xl">장바구니</h1>
        <p className="mt-4 max-w-2xl leading-7 text-gray-600">
          주문 전 상품과 수량을 확인해 주세요. 주문 제출은 로그인 후 가능합니다.
        </p>
      </div>
      <CartView products={products} isSignedIn={isSignedIn} />
    </main>
  );
}
