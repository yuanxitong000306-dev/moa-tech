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

function toBoolean(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function toPrice(formData: FormData) {
  const rawPrice = Number(formData.get("price") ?? 0);
  return Number.isFinite(rawPrice) ? Math.max(0, Math.round(rawPrice)) : 0;
}

function toSpecs(formData: FormData) {
  return optionalString(formData, "specs")
    .split(/\r?\n/)
    .map((spec) => spec.trim())
    .filter(Boolean);
}

async function uploadImageIfPresent(formData: FormData, slug: string, fallbackImageUrl: string) {
  const file = formData.get("image_file");
  if (!(file instanceof File) || file.size === 0) {
    return fallbackImageUrl;
  }

  const supabase = createSupabaseAdminClient();
  const extension = file.name.split(".").pop() || "png";
  const filePath = `${slug}-${Date.now()}.${extension}`;

  const { error } = await supabase.storage
    .from("product-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
      contentType: file.type || "image/png"
    });

  if (error) {
    throw error;
  }

  const {
    data: { publicUrl }
  } = supabase.storage.from("product-images").getPublicUrl(filePath);

  return publicUrl;
}

export async function saveProductAction(formData: FormData) {
  const supabase = createSupabaseAdminClient();
  const originalId = optionalString(formData, "original_id");
  const slug = requiredString(formData, "slug");
  const categoryId = requiredString(formData, "category_id");
  const categoryName = requiredString(formData, "category_name");
  const fallbackImageUrl = optionalString(formData, "image_url") || "/products/hero-devices.svg";
  const imageUrl = await uploadImageIfPresent(formData, slug, fallbackImageUrl);

  const row = {
    id: originalId || slug,
    slug,
    name: requiredString(formData, "name"),
    brand: requiredString(formData, "brand"),
    category_id: categoryId,
    category_name: categoryName,
    price: toPrice(formData),
    badge: optionalString(formData, "badge") || "NEW",
    is_hot: toBoolean(formData, "is_hot"),
    is_new: toBoolean(formData, "is_new"),
    image_url: imageUrl,
    short_description: requiredString(formData, "short_description"),
    specs: toSpecs(formData),
    delivery: optionalString(formData, "delivery")
  };

  const { error } = await supabase.from("products").upsert(row, {
    onConflict: "id"
  });

  if (error) {
    throw error;
  }

  revalidatePath("/admin/products");
  revalidatePath("/");
}

export async function deleteProductAction(formData: FormData) {
  const supabase = createSupabaseAdminClient();
  const id = requiredString(formData, "id");
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    throw error;
  }

  revalidatePath("/admin/products");
  revalidatePath("/");
}
