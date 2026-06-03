"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function SignOutButton({ compact = false }: { compact?: boolean }) {
  const router = useRouter();

  return (
    <button
      type="button"
      className={
        compact
          ? "inline-flex h-10 items-center rounded-full border border-line bg-white px-4 text-sm font-black text-gray-600 transition hover:border-ink hover:text-ink"
          : "flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 text-sm font-black text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
      }
      onClick={async () => {
        const supabase = createSupabaseBrowserClient();
        await supabase.auth.signOut();
        router.push("/admin/login");
        router.refresh();
      }}
    >
      {!compact ? <LogOut size={18} /> : null}
      退出登录
    </button>
  );
}
