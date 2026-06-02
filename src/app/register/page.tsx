import Link from "next/link";
import { RegisterForm } from "@/app/register/RegisterForm";

export const metadata = {
  title: "회원가입 | MOA TECH"
};

export default function RegisterPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-12 lg:px-8">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Account</p>
      <h1 className="mt-2 text-4xl font-black text-ink">회원가입</h1>
      <p className="mt-3 text-sm leading-6 text-gray-500">
        주문과 배송을 위해 필요한 정보를 입력해 주세요.
      </p>
      <RegisterForm />
      <p className="mt-5 text-sm text-gray-500">
        이미 계정이 있으신가요? <Link href="/login" className="font-black text-ink">로그인</Link>
      </p>
    </main>
  );
}
