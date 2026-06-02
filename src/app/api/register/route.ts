import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

type RegisterPayload = {
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  address?: string;
};

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => ({}))) as RegisterPayload;
  const email = payload.email?.trim();
  const password = payload.password ?? "";
  const name = payload.name?.trim();
  const phone = payload.phone?.trim();
  const address = payload.address?.trim();

  if (!email || !password || !name || !phone || !address) {
    return NextResponse.json({ message: "모든 항목을 입력해 주세요." }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ message: "비밀번호는 6자 이상 입력해 주세요." }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { data: created, error: createError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name, phone, address }
  });

  if (createError || !created.user) {
    return NextResponse.json(
      { message: createError?.message.includes("already") ? "이미 가입된 이메일입니다." : "회원가입에 실패했습니다." },
      { status: 400 }
    );
  }

  const profile = {
    id: created.user.id,
    email,
    name,
    phone,
    address,
    full_name: name,
    shipping_address: address
  };

  const { error: profileError } = await supabase.from("profiles").upsert(profile, { onConflict: "id" });

  if (profileError) {
    await supabase.from("profiles").upsert(
      {
        id: created.user.id,
        email,
        full_name: name,
        phone,
        shipping_address: address
      },
      { onConflict: "id" }
    );
  }

  return NextResponse.json({ ok: true });
}
