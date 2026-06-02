"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function AdminLoginForm() {
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

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError) {
      setError("登录失败，请检查邮箱和密码。");
      setLoading(false);
      return;
    }

    router.push(searchParams.get("next") || "/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid gap-4">
      <label className="grid gap-2 text-sm font-bold text-gray-600">
        管理员邮箱
        <input
          name="email"
          type="email"
          required
          className="h-12 rounded-md border border-line px-4 text-ink outline-none focus:border-ink"
          placeholder="admin@example.com"
        />
      </label>
      <label className="grid gap-2 text-sm font-bold text-gray-600">
        密码
        <input
          name="password"
          type="password"
          required
          className="h-12 rounded-md border border-line px-4 text-ink outline-none focus:border-ink"
          placeholder="请输入密码"
        />
      </label>
      {searchParams.get("error") === "not_admin" ? (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-bold text-red-600">当前账号不是管理员。</p>
      ) : null}
      {error ? <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="h-12 rounded-md bg-ink px-5 text-sm font-black text-white transition hover:bg-gray-800 disabled:opacity-60"
      >
        {loading ? "登录中..." : "登录后台"}
      </button>
    </form>
  );
}
