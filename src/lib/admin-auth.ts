import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function getAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function requireAdmin() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/admin/login");
  }

  const adminEmails = getAdminEmails();
  if (adminEmails.length === 0 || !adminEmails.includes(user.email.toLowerCase())) {
    redirect("/admin/login?error=not_admin");
  }

  return user;
}
