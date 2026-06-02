import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/app/login/LoginForm";

export const metadata = {
  title: "로그인 | MOA TECH"
};

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-12 lg:px-8">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Account</p>
      <h1 className="mt-2 text-4xl font-black text-ink">로그인</h1>
      <p className="mt-3 text-sm leading-6 text-gray-500">
        주문과 마이페이지 이용을 위해 로그인해 주세요.
      </p>
      <Suspense>
        <LoginForm />
      </Suspense>
      <p className="mt-5 text-sm text-gray-500">
        아직 계정이 없으신가요? <Link href="/register" className="font-black text-ink">회원가입</Link>
      </p>
    </main>
  );
}
