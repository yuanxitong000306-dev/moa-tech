"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

function requiredString(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  if (!value) {
    throw new Error(`${key} is required`);
  }
  return value;
}

function optionalString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function toSortOrder(formData: FormData) {
  const value = Number(formData.get("sort_order") ?? 0);
  return Number.isFinite(value) ? Math.round(value) : 0;
}

export async function saveCategoryAction(formData: FormData) {
  const supabase = createSupabaseAdminClient();
  const id = requiredString(formData, "id");

  const { error } = await supabase.from("categories").upsert(
    {
      id,
      name: requiredString(formData, "name"),
      description: optionalString(formData, "description"),
      sort_order: toSortOrder(formData)
    },
    { onConflict: "id" }
  );

  if (error) {
    throw error;
  }

  revalidatePath("/admin/categories");
  revalidatePath("/");
}

export async function deleteCategoryAction(formData: FormData) {
  const supabase = createSupabaseAdminClient();
  const id = requiredString(formData, "id");
  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) {
    throw error;
  }

  revalidatePath("/admin/categories");
  revalidatePath("/");
}
