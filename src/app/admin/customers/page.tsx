import { AdminBackLink } from "@/app/admin/AdminBackLink";
import { AdminShell } from "@/app/admin/AdminShell";
import { getAdminProfiles } from "@/lib/admin-data";

export const metadata = {
  title: "会员管理 | MOA TECH"
};

export default async function AdminCustomersPage() {
  const profiles = await getAdminProfiles();

  return (
    <AdminShell>
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <AdminBackLink />
        <div className="mt-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Customers</p>
          <h1 className="mt-2 text-3xl font-black text-ink">会员管理</h1>
          <p className="mt-3 text-sm leading-6 text-gray-500">
            查看注册用户资料、收货地址和订单数量。
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-lg border border-line bg-white shadow-sm">
          <table className="w-full min-w-[980px] border-collapse text-left text-sm">
            <thead className="bg-mist text-xs font-black uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3">用户邮箱</th>
                <th className="px-4 py-3">姓名</th>
                <th className="px-4 py-3">手机号</th>
                <th className="px-4 py-3">收货地址</th>
                <th className="px-4 py-3">订单数量</th>
                <th className="px-4 py-3">注册时间</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile) => (
                <tr key={profile.id} className="border-t border-line">
                  <td className="px-4 py-3 font-black text-ink">{profile.email}</td>
                  <td className="px-4 py-3 text-gray-600">{profile.name || profile.full_name || "-"}</td>
                  <td className="px-4 py-3 text-gray-600">{profile.phone || "-"}</td>
                  <td className="px-4 py-3 text-gray-600">{profile.address || profile.shipping_address || "-"}</td>
                  <td className="px-4 py-3 font-black text-ink">{profile.order_count ?? 0}</td>
                  <td className="px-4 py-3 text-gray-500">{new Date(profile.created_at).toLocaleString("zh-CN")}</td>
                </tr>
              ))}
              {profiles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-gray-500">
                    暂无会员
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </main>
    </AdminShell>
  );
}
