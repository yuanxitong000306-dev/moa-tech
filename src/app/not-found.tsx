import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-5 text-center">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-accent">404</p>
      <h1 className="mt-3 text-3xl font-black text-ink">페이지를 찾을 수 없습니다</h1>
      <p className="mt-4 leading-7 text-gray-600">요청하신 상품이나 카테고리가 삭제되었거나 주소가 변경되었습니다.</p>
      <Link href="/" className="mt-8 rounded-md bg-ink px-5 py-3 text-sm font-black text-white">
        홈으로 이동
      </Link>
    </main>
  );
}
