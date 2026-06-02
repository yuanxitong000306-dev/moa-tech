"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAllProducts } from "@/lib/products";

type SubmittedCartItem = {
  productId: string;
  quantity: number;
};

function makeOrderNumber() {
  return `MOA-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export async function createOrderAction(formData: FormData) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/cart");
  }

  const rawItems = String(formData.get("items") ?? "[]");
  const submittedItems = JSON.parse(rawItems) as SubmittedCartItem[];
  const validItems = submittedItems.filter((item) => item.productId && item.quantity > 0);

  if (validItems.length === 0) {
    throw new Error("Cart is empty");
  }

  const allProducts = await getAllProducts();
  const orderItems = validItems.map((item) => {
    const product = allProducts.find((entry) => entry.id === item.productId);
    if (!product) {
      throw new Error(`Product not found: ${item.productId}`);
    }
    return {
      product_id: product.id,
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      image_url: product.image,
      quantity: item.quantity,
      price: product.price,
      amount: product.price * item.quantity
    };
  });
  const totalAmount = orderItems.reduce((sum, item) => sum + item.amount, 0);

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  const shippingInfo = {
    name: profile?.name ?? profile?.full_name ?? user.email ?? "",
    phone: profile?.phone ?? "",
    email: profile?.email ?? user.email ?? "",
    address: profile?.address ?? profile?.shipping_address ?? ""
  };

  const { data: order, error } = await supabase.from("orders").insert({
    order_number: makeOrderNumber(),
    user_id: user.id,
    customer_name: shippingInfo.name,
    customer_phone: shippingInfo.phone,
    customer_email: shippingInfo.email,
    shipping_address: shippingInfo.address,
    status: "pending",
    currency: "KRW",
    total_amount: totalAmount,
    items: orderItems,
    shipping_info: shippingInfo
  }).select("id").single();

  if (error) {
    throw error;
  }

  const { error: itemsError } = await supabase.from("order_items").insert(
    orderItems.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_slug: item.slug,
      product_name: item.name,
      product_brand: item.brand,
      product_image_url: item.image_url,
      unit_price: item.price,
      quantity: item.quantity,
      subtotal_amount: item.amount
    }))
  );

  if (itemsError) {
    throw itemsError;
  }

  redirect("/mypage?ordered=1");
}
