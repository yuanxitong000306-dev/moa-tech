export const metadata = {
  title: "배송 정책 | MOA TECH"
};

export default function DeliveryPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 lg:px-8">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Delivery Policy</p>
      <h1 className="mt-2 text-3xl font-black text-ink md:text-5xl">배송 정책</h1>
      <div className="mt-8 space-y-5 rounded-lg border border-line bg-white p-6 leading-7 text-gray-600 shadow-soft md:p-8">
        <section>
          <h2 className="text-xl font-black text-ink">배송 방식</h2>
          <p className="mt-2">MOA TECH의 상품은 브랜드별 재고 위치에 따라 택배 또는 브랜드 직배송으로 출고됩니다.</p>
        </section>
        <section>
          <h2 className="text-xl font-black text-ink">출고 일정</h2>
          <p className="mt-2">평일 오후 2시 이전 문의 및 주문 확정 건은 가능한 당일 출고를 우선으로 처리합니다. 일부 상품은 브랜드 사정에 따라 1-2영업일이 추가될 수 있습니다.</p>
        </section>
        <section>
          <h2 className="text-xl font-black text-ink">배송 기간</h2>
          <p className="mt-2">일반 지역은 출고 후 평균 1-3영업일 내 도착합니다. 제주 및 도서산간 지역은 추가 기간과 비용이 발생할 수 있습니다.</p>
        </section>
        <section>
          <h2 className="text-xl font-black text-ink">배송비</h2>
          <p className="mt-2">기본 배송비는 상품 및 브랜드 정책에 따라 다르며, 정확한 금액은 카카오톡 문의 시 안내드립니다.</p>
        </section>
      </div>
    </main>
  );
}
