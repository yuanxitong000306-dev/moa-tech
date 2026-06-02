import { Suspense } from "react";
import { AdminLoginForm } from "@/app/admin/login/AdminLoginForm";

export const metadata = {
  title: "管理员登录 | MOA TECH"
};

export default function AdminLoginPage() {
  return (
    <main className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-10">
      <style>{`
        .public-site-header,
        .public-site-footer,
        .public-site-widget {
          display: none !important;
        }
      `}</style>
      <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Admin</p>
      <h1 className="mt-2 text-3xl font-black text-ink">管理员登录</h1>
      <p className="mt-3 text-sm leading-6 text-gray-500">
        登录后可管理商品、分类、会员和订单。
      </p>
      <Suspense>
        <AdminLoginForm />
      </Suspense>
    </main>
  );
}
