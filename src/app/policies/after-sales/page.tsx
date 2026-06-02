export const metadata = {
  title: "A/S 정책 | MOA TECH"
};

export default function AfterSalesPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 lg:px-8">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">After-sales Policy</p>
      <h1 className="mt-2 text-3xl font-black text-ink md:text-5xl">A/S 및 교환·반품 정책</h1>
      <div className="mt-8 space-y-5 rounded-lg border border-line bg-white p-6 leading-7 text-gray-600 shadow-soft md:p-8">
        <section>
          <h2 className="text-xl font-black text-ink">교환 및 반품 기간</h2>
          <p className="mt-2">상품 수령 후 7일 이내 카카오톡으로 접수해 주세요. 미사용 상태와 구성품 보존 여부를 확인한 뒤 안내드립니다.</p>
        </section>
        <section>
          <h2 className="text-xl font-black text-ink">초기 불량</h2>
          <p className="mt-2">초기 불량이 확인되는 경우 동일 상품 교환을 우선으로 진행합니다. 재고가 없을 경우 대체 상품 또는 환불 절차를 안내합니다.</p>
        </section>
        <section>
          <h2 className="text-xl font-black text-ink">교환·반품이 어려운 경우</h2>
          <p className="mt-2">사용 흔적, 패키지 훼손, 구성품 누락, 고객 과실로 인한 파손이 있는 경우 교환 및 반품이 제한될 수 있습니다.</p>
        </section>
        <section>
          <h2 className="text-xl font-black text-ink">A/S 안내</h2>
          <p className="mt-2">브랜드 보증이 적용되는 상품은 보증 기간과 처리 기준에 따라 A/S를 연결해 드립니다. 문의 시 주문 정보와 증상 사진을 함께 보내주시면 더 빠르게 확인할 수 있습니다.</p>
        </section>
      </div>
    </main>
  );
}
