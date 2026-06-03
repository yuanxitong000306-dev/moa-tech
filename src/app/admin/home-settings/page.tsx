import Image from "next/image";
import { AdminShell } from "@/app/admin/AdminShell";
import { saveHomeSettingsAction } from "@/app/admin/home-settings/actions";
import { getAdminSiteSettings } from "@/lib/admin-data";
import { defaultHomeHeroSettings } from "@/lib/site-settings";

export const metadata = {
  title: "首页设置 | MOA TECH"
};

export const dynamic = "force-dynamic";

export default async function AdminHomeSettingsPage() {
  const settings = await getAdminSiteSettings();
  const heroTitle = settings?.hero_title || defaultHomeHeroSettings.heroTitle;
  const heroSubtitle = settings?.hero_subtitle || defaultHomeHeroSettings.heroSubtitle;
  const heroButtonText = settings?.hero_button_text || defaultHomeHeroSettings.heroButtonText;
  const heroButtonUrl = settings?.hero_button_url || defaultHomeHeroSettings.heroButtonUrl;
  const heroImageUrl = settings?.hero_image_url || defaultHomeHeroSettings.heroImageUrl;

  return (
    <AdminShell>
      <main className="px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Home Settings</p>
            <h1 className="mt-2 text-3xl font-black text-ink">首页设置</h1>
            <p className="mt-3 text-sm leading-6 text-gray-500">
              管理前台首页 Hero Banner 的图片、标题、副标题和按钮跳转。
            </p>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_420px]">
            <form action={saveHomeSettingsAction} className="grid gap-5 rounded-2xl border border-line bg-white p-6 shadow-sm">
              <input type="hidden" name="current_hero_image_url" value={heroImageUrl} />

              <label className="grid gap-2 text-sm font-bold text-gray-600">
                首页标题
                <textarea
                  name="hero_title"
                  defaultValue={heroTitle}
                  rows={3}
                  className="rounded-lg border border-line px-4 py-3 text-ink outline-none focus:border-ink"
                />
              </label>

              <label className="grid gap-2 text-sm font-bold text-gray-600">
                首页副标题
                <textarea
                  name="hero_subtitle"
                  defaultValue={heroSubtitle}
                  rows={4}
                  className="rounded-lg border border-line px-4 py-3 text-ink outline-none focus:border-ink"
                />
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-bold text-gray-600">
                  按钮文字
                  <input
                    name="hero_button_text"
                    defaultValue={heroButtonText}
                    className="h-11 rounded-lg border border-line px-4 text-ink outline-none focus:border-ink"
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold text-gray-600">
                  按钮跳转链接
                  <input
                    name="hero_button_url"
                    defaultValue={heroButtonUrl}
                    className="h-11 rounded-lg border border-line px-4 text-ink outline-none focus:border-ink"
                    placeholder="#all-products"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-bold text-gray-600">
                上传首页 Hero 图片
                <input name="hero_image_file" type="file" accept="image/*" className="rounded-lg border border-line bg-white px-4 py-3" />
                <span className="text-xs font-semibold text-gray-400">建议使用横向产品场景图，上传后会自动同步到前台首页。</span>
              </label>

              <button type="submit" className="h-12 rounded-lg bg-ink px-6 text-sm font-black text-white transition hover:bg-gray-800">
                保存首页设置
              </button>
            </form>

            <aside className="rounded-2xl border border-line bg-white p-5 shadow-sm">
              <p className="text-sm font-black text-ink">当前 Hero 图片预览</p>
              <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-[24px] bg-mist">
                <Image src={heroImageUrl} alt="首页 Hero 图片预览" fill className="object-cover" sizes="420px" />
              </div>
              <div className="mt-5 rounded-2xl bg-mist p-5">
                <p className="whitespace-pre-line text-2xl font-black leading-tight text-ink">{heroTitle}</p>
                <p className="mt-3 whitespace-pre-line text-sm font-semibold leading-6 text-gray-600">{heroSubtitle}</p>
                <p className="mt-4 inline-flex rounded-lg bg-ink px-4 py-2 text-sm font-black text-white">{heroButtonText}</p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </AdminShell>
  );
}
