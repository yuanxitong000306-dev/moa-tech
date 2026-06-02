import Link from "next/link";

export function AdminBackLink() {
  return (
    <Link
      href="/admin"
      className="inline-flex h-10 items-center rounded-md border border-line bg-white px-4 text-sm font-black text-gray-600 shadow-sm transition hover:border-ink hover:text-ink"
    >
      返回后台首页
    </Link>
  );
}
