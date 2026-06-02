# MOA TECH 모바일 액세서리 몰

Next.js, TypeScript, Tailwind CSS로 만든 한국어 모바일 액세서리 다중 브랜드 쇼핑몰입니다.

## 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 열면 됩니다.

## 주요 구조

- `src/data/products.json`: 현재 사용하는 로컬 상품 데이터
- `src/lib/products.ts`: 상품 조회, 가격 포맷, 베스트/신상품 분리 로직
- `src/lib/categories.ts`: 카테고리 정의
- `src/app/page.tsx`: 홈, 배너, 카테고리, 베스트, 신상품
- `src/app/products/[slug]/page.tsx`: 상품 상세
- `src/app/categories/[category]/page.tsx`: 카테고리별 상품 목록
- `src/app/cart/page.tsx`: 로컬 장바구니 페이지
- `src/app/policies/delivery/page.tsx`: 배송 정책
- `src/app/policies/after-sales/page.tsx`: A/S 및 교환·반품 정책
- `src/components/ProductExplorer.tsx`: 상품 검색 및 카테고리 필터
- `public/products`: 로컬 상품 이미지

결제는 아직 연결하지 않고 모든 구매 버튼을 `카카오톡 문의하기`로 구성했습니다.

## 정적 미리보기

npm 없이 확인할 때는 `outputs/open-moa-tech-preview.cmd`를 실행한 뒤 `http://127.0.0.1:4173/`에서 확인할 수 있습니다.

## Supabase 后台管理

1. 在 Supabase 创建项目，并把 `.env.example` 复制为 `.env.local`。
2. 填入：

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
ADMIN_EMAILS=admin@example.com
```

3. 在 Supabase SQL Editor 执行 `supabase/schema.sql`。
4. 在 Supabase Auth 里创建管理员账号，邮箱必须写进 `ADMIN_EMAILS`。
5. 安装依赖后运行迁移，把当前 `products.json` 导入 Supabase：

```bash
npm install
npm run supabase:migrate-products
```

6. 启动项目后访问 `/admin/login` 登录后台。

后台页面：

- `/admin` 后台首页
- `/admin/products` 商品管理，支持新增、编辑、删除、上传图片
- `/admin/orders` 订单管理
