"use client";

import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function FrontSignOutButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      className="shrink-0 text-sm font-bold text-gray-600 transition hover:text-ink"
      onClick={async () => {
        const supabase = createSupabaseBrowserClient();
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
      }}
    >
      로그아웃
    </button>
  );
}
