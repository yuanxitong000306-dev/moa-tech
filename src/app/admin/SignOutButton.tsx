"use client";

import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      className="rounded-md border border-line bg-white px-4 py-2 text-sm font-black text-gray-600 transition hover:border-ink hover:text-ink"
      onClick={async () => {
        const supabase = createSupabaseBrowserClient();
        await supabase.auth.signOut();
        router.push("/admin/login");
        router.refresh();
      }}
    >
      退出登录
    </button>
  );
}
