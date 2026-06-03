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
            <div className="mx-auto flex min-h-14 max-w-7xl items-center justify-between gap-2 px-3 py-2 sm:min-h-16 sm:px-4 sm:py-3 lg:px-8">
              <Link href="/" className="shrink-0 text-xl font-black tracking-[-0.02em] text-ink sm:text-2xl">
                MOA TECH
              </Link>

              <nav className="mx-1 flex min-w-0 flex-1 items-center gap-3 overflow-x-auto whitespace-nowrap text-xs font-bold text-gray-600 sm:mx-4 sm:gap-5 sm:text-sm md:gap-6">
                <Link href="/products" className="shrink-0 transition hover:text-ink">
                  상품분류
                </Link>
                <Link href="/products?tag=BEST" className="shrink-0 transition hover:text-ink">
                  베스트
                </Link>
                <Link href="/products?tag=NEW" className="shrink-0 transition hover:text-ink">
                  신상품
                </Link>
                <Link href="/#brands" className="shrink-0 transition hover:text-ink">
                  브랜드
                </Link>
                <Link href="/products" className="shrink-0 transition hover:text-ink">
                  상품검색
                </Link>
                <Link href="/cart" className="shrink-0 transition hover:text-ink">
                  장바구니
                </Link>
                {isSignedIn ? (
                  <>
                    <Link href="/mypage" className="shrink-0 transition hover:text-ink">
                      마이페이지
                    </Link>
                    <FrontSignOutButton />
                  </>
                ) : (
                  <>
                    <Link href="/login" className="shrink-0 transition hover:text-ink">
                      로그인
                    </Link>
                    <Link href="/register" className="shrink-0 transition hover:text-ink">
                      회원가입
                    </Link>
                  </>
                )}
              </nav>

              <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                <Link
                  href="/products"
                  aria-label="상품검색"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white text-ink transition hover:border-ink sm:h-10 sm:w-auto sm:gap-2 sm:px-3 sm:text-sm sm:font-black"
                >
                  <Search size={17} />
                  <span className="hidden sm:inline">상품검색</span>
                </Link>
                <Link
                  href="/cart"
                  aria-label="장바구니"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-white transition hover:bg-gray-800 sm:h-10 sm:w-10"
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
                <p className="mt-3 max-w-md leading-6">Smart Accessories For Everyday. 매일 쓰는 모바일 기어를 더 정교하게.</p>
              </div>
              <div>
                <p className="font-bold text-ink">고객센터</p>
                <p className="mt-3">운영시간 10:00-18:00</p>
                <p>Kakao 1:1 상담</p>
              </div>
              <div>
                <p className="font-bold text-ink">정책 안내</p>
                <Link href="/policies/delivery" className="mt-3 block transition hover:text-ink">
                  배송 정책
                </Link>
                <Link href="/policies/after-sales" className="mt-1 block transition hover:text-ink">
                  교환/반품 정책
                </Link>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
