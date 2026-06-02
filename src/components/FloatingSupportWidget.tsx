import { MessageCircle } from "lucide-react";

export function FloatingSupportWidget() {
  return (
    <a
      href="https://pf.kakao.com/"
      target="_blank"
      rel="noreferrer"
      className="public-site-widget fixed bottom-5 right-4 z-50 inline-flex h-14 items-center gap-2 rounded-full bg-[#FEE500] px-5 text-sm font-black text-[#191919] shadow-2xl ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:brightness-95 active:translate-y-0 sm:bottom-6 sm:right-6 sm:h-15 sm:px-6"
      aria-label="카카오 상담"
    >
      <MessageCircle size={20} />
      카카오 상담
    </a>
  );
}
