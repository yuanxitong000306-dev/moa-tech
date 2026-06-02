"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const name = String(formData.get("name") ?? "");
    const phone = String(formData.get("phone") ?? "");
    const address = String(formData.get("address") ?? "");

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name, phone, address })
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { message?: string } | null;
      setError(payload?.message ?? "회원가입에 실패했습니다. 다시 시도해 주세요.");
      setLoading(false);
      return;
    }

    const supabase = createSupabaseBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      router.push("/login?registered=1");
      router.refresh();
      return;
    }

    router.push("/mypage");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid gap-4 rounded-lg border border-line bg-white p-6 shadow-soft">
      <label className="grid gap-2 text-sm font-bold text-gray-600">
        이메일
        <input name="email" type="email" required className="h-12 rounded-md border border-line px-4 outline-none focus:border-ink" />
      </label>
      <label className="grid gap-2 text-sm font-bold text-gray-600">
        비밀번호
        <input name="password" type="password" minLength={6} required className="h-12 rounded-md border border-line px-4 outline-none focus:border-ink" />
      </label>
      <label className="grid gap-2 text-sm font-bold text-gray-600">
        이름
        <input name="name" required className="h-12 rounded-md border border-line px-4 outline-none focus:border-ink" />
      </label>
      <label className="grid gap-2 text-sm font-bold text-gray-600">
        휴대폰 번호
        <input name="phone" required className="h-12 rounded-md border border-line px-4 outline-none focus:border-ink" />
      </label>
      <label className="grid gap-2 text-sm font-bold text-gray-600">
        배송지 주소
        <textarea name="address" required rows={3} className="rounded-md border border-line px-4 py-3 outline-none focus:border-ink" />
      </label>
      {error ? <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{error}</p> : null}
      <button disabled={loading} className="h-12 rounded-md bg-ink text-sm font-black text-white transition hover:bg-gray-800 disabled:opacity-60">
        {loading ? "가입 처리 중..." : "회원가입"}
      </button>
    </form>
  );
}
