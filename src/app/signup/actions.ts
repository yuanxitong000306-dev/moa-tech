"use server";

import { redirect } from "next/navigation";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

function requiredString(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  if (!value) {
    throw new Error(`${key} is required`);
  }
  return value;
}

export async function signUpAction(formData: FormData) {
  const email = requiredString(formData, "email").toLowerCase();
  const password = requiredString(formData, "password");
  const fullName = requiredString(formData, "full_name");
  const phone = requiredString(formData, "phone");
  const shippingAddress = requiredString(formData, "shipping_address");
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: fullName,
      phone,
      shipping_address: shippingAddress
    }
  });

  if (error) {
    throw error;
  }

  if (!data.user) {
    throw new Error("User was not created");
  }

  const { error: profileError } = await supabase.from("profiles").upsert(
    {
      id: data.user.id,
      email,
      full_name: fullName,
      phone,
      shipping_address: shippingAddress
    },
    { onConflict: "id" }
  );

  if (profileError) {
    throw profileError;
  }

  redirect("/login?registered=1");
}
