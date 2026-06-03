"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { defaultHomeHeroSettings } from "@/lib/site-settings";

function textValue(formData: FormData, key: string, fallback: string) {
  const value = String(formData.get(key) ?? "").trim();
  return value || fallback;
}

async function uploadHeroImageIfPresent(formData: FormData, fallbackImageUrl: string) {
  const file = formData.get("hero_image_file");
  if (!(file instanceof File) || file.size === 0) {
    return fallbackImageUrl;
  }

  const supabase = createSupabaseAdminClient();
  const extension = file.name.split(".").pop() || "png";
  const filePath = `home/hero-${Date.now()}.${extension}`;

  const { error } = await supabase.storage.from("site-assets").upload(filePath, file, {
    cacheControl: "3600",
    upsert: true,
    contentType: file.type || "image/png"
  });

  if (error) {
    throw error;
  }

  const {
    data: { publicUrl }
  } = supabase.storage.from("site-assets").getPublicUrl(filePath);

  return publicUrl;
}

export async function saveHomeSettingsAction(formData: FormData) {
  const supabase = createSupabaseAdminClient();
  const currentImageUrl = textValue(formData, "current_hero_image_url", defaultHomeHeroSettings.heroImageUrl);
  const heroImageUrl = await uploadHeroImageIfPresent(formData, currentImageUrl);

  const row = {
    id: "home",
    hero_title: textValue(formData, "hero_title", defaultHomeHeroSettings.heroTitle),
    hero_subtitle: textValue(formData, "hero_subtitle", defaultHomeHeroSettings.heroSubtitle),
    hero_button_text: textValue(formData, "hero_button_text", defaultHomeHeroSettings.heroButtonText),
    hero_button_url: textValue(formData, "hero_button_url", defaultHomeHeroSettings.heroButtonUrl),
    hero_image_url: heroImageUrl
  };

  const { error } = await supabase.from("site_settings").upsert(row, { onConflict: "id" });

  if (error) {
    throw error;
  }

  revalidatePath("/");
  revalidatePath("/admin/home-settings");
}
