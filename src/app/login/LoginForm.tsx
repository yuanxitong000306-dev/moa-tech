"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const supabase = createSupabaseBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError("로그인에 실패했습니다. 이메일과 비밀번호를 다시 확인해 주세요.");
      setLoading(false);
      return;
    }

    router.push(searchParams.get("next") || "/mypage");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid gap-4 rounded-lg border border-line bg-white p-6 shadow-soft">
      {searchParams.get("registered") ? (
        <p className="rounded-md bg-blue-50 px-4 py-3 text-sm font-bold text-accent">
          회원가입이 완료되었습니다. 로그인해 주세요.
        </p>
      ) : null}
      <label className="grid gap-2 text-sm font-bold text-gray-600">
        이메일
        <input name="email" type="email" required className="h-12 rounded-md border border-line px-4 outline-none focus:border-ink" />
      </label>
      <label className="grid gap-2 text-sm font-bold text-gray-600">
        비밀번호
        <input name="password" type="password" required className="h-12 rounded-md border border-line px-4 outline-none focus:border-ink" />
      </label>
      {error ? <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{error}</p> : null}
      <button disabled={loading} className="h-12 rounded-md bg-ink text-sm font-black text-white transition hover:bg-gray-800 disabled:opacity-60">
        {loading ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
}
