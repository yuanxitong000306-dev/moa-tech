import { createClient } from "@supabase/supabase-js";

export type HomeHeroSettings = {
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  heroButtonUrl: string;
  heroImageUrl: string;
};

export const defaultHomeHeroSettings: HomeHeroSettings = {
  heroTitle: "Smart Life,\nBetter Choice.",
  heroSubtitle: "검증된 브랜드와 고품질 제품으로\n더 스마트한 일상을 경험하세요.",
  heroButtonText: "쇼핑 바로가기",
  heroButtonUrl: "#brands",
  heroImageUrl: "/products/apple-ecosystem-hero-banner.png"
};

type SiteSettingsRow = {
  hero_title?: string | null;
  hero_subtitle?: string | null;
  hero_button_text?: string | null;
  hero_button_url?: string | null;
  hero_image_url?: string | null;
};

export async function getHomeHeroSettings(): Promise<HomeHeroSettings> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return defaultHomeHeroSettings;
  }

  const supabase = createClient(url, anonKey);
  const { data, error } = await supabase.from("site_settings").select("*").eq("id", "home").maybeSingle();

  if (error || !data) {
    return defaultHomeHeroSettings;
  }

  const row = data as SiteSettingsRow;

  return {
    heroTitle: row.hero_title || defaultHomeHeroSettings.heroTitle,
    heroSubtitle: row.hero_subtitle || defaultHomeHeroSettings.heroSubtitle,
    heroButtonText: row.hero_button_text || defaultHomeHeroSettings.heroButtonText,
    heroButtonUrl: row.hero_button_url || defaultHomeHeroSettings.heroButtonUrl,
    heroImageUrl: row.hero_image_url || defaultHomeHeroSettings.heroImageUrl
  };
}
