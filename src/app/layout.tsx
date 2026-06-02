import type { Metadata } from "next";
import Link from "next/link";
import { Search, ShoppingBag } from "lucide-react";
import { CartProvider } from "@/components/CartProvider";
import { FloatingSupportWidget } from "@/components/FloatingSupportWidget";
import { FrontSignOutButton } from "@/components/FrontSignOutButton";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import "./globals.css";

export const metadata: Metadata = {
  title: "MOA TECH | 프리미엄 모바일 액세서리",
  description: "Smart Accessories For Everyday. 매일 쓰는 모바일 기어를 더 정교하게."
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  let isSignedIn = false;
  try {
    const supabase = createSupabaseServerClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();
    isSignedIn = Boolean(user);
  } catch {}

  return (
    <html lang="ko">
      <body>
        <CartProvider>
          <header className="public-site-header sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-xl">
            <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 lg:px-8">
              <Link href="/" className="text-2xl font-black tracking-[-0.02em] text-ink">
                MOA TECH
              </Link>
              <nav className="order-3 flex w-full items-center gap-4 overflow-x-auto text-sm font-bold text-gray-600 md:order-none md:w-auto md:gap-6">
                <Link href="/#categories" className="shrink-0 transition hover:text-ink">상품분류</Link>
                <Link href="/#hot" className="shrink-0 transition hover:text-ink">베스트</Link>
                <Link href="/#new" className="shrink-0 transition hover:text-ink">신상품</Link>
                <Link href="/#all-products" className="shrink-0 transition hover:text-ink">상품검색</Link>
                <Link href="/cart" className="shrink-0 transition hover:text-ink">장바구니</Link>
                {isSignedIn ? (
                  <>
                    <Link href="/mypage" className="shrink-0 transition hover:text-ink">마이페이지</Link>
                    <FrontSignOutButton />
                  </>
                ) : (
                  <>
                    <Link href="/login" className="shrink-0 transition hover:text-ink">로그인</Link>
                    <Link href="/register" className="shrink-0 transition hover:text-ink">회원가입</Link>
                  </>
                )}
              </nav>
              <div className="flex items-center gap-2">
                <Link
                  href="/#all-products"
                  className="inline-flex h-10 items-center gap-2 rounded-md border border-line bg-white px-3 text-sm font-black text-ink transition hover:border-ink"
                >
                  <Search size={17} />
                  <span className="hidden sm:inline">상품검색</span>
                </Link>
                <Link
                  href="/cart"
                  aria-label="장바구니"
                  className="flex h-10 w-10 items-center justify-center rounded-md bg-ink text-white transition hover:bg-gray-800"
                >
                  <ShoppingBag size={18} />
                </Link>
              </div>
            </div>
          </header>
          {children}
          <FloatingSupportWidget />
          <footer className="public-site-footer border-t border-line bg-white">
            <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm text-gray-500 md:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
              <div>
                <p className="text-base font-black text-ink">MOA TECH</p>
                <p className="mt-3 max-w-md leading-6">
                  Smart Accessories For Everyday. 매일 쓰는 모바일 기어를 더 정교하게.
                </p>
              </div>
              <div>
                <p className="font-bold text-ink">고객센터</p>
                <p className="mt-3">평일 10:00-18:00</p>
                <p>Kakao 실시간 상담</p>
              </div>
              <div>
                <p className="font-bold text-ink">정책 안내</p>
                <Link href="/policies/delivery" className="mt-3 block transition hover:text-ink">배송 정책</Link>
                <Link href="/policies/after-sales" className="mt-1 block transition hover:text-ink">교환 및 반품 정책</Link>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
