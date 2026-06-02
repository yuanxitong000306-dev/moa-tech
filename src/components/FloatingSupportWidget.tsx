import { MessageCircle } from "lucide-react";

export function FloatingSupportWidget() {
  return (
    <a
      href="https://pf.kakao.com/"
      target="_blank"
      rel="noreferrer"
      className="public-site-widget fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#FEE500] text-[#191919] shadow-xl ring-1 ring-black/5 transition hover:scale-105 hover:shadow-2xl active:scale-100 sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
      aria-label="카카오 상담"
    >
      <MessageCircle size={26} strokeWidth={2.5} />
    </a>
  );
}
