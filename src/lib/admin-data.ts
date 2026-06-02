import { createSupabaseAdminClient } from "@/lib/supabase/server";

export type AdminCategory = {
  id: string;
  name: string;
  description: string | null;
  sort_order: number;
};

export type AdminProduct = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category_id: string;
  category_name: string;
  price: number;
  badge: string;
  is_hot: boolean;
  is_new: boolean;
  image_url: string;
  short_description: string;
  specs: string[];
  delivery: string;
  created_at: string;
  updated_at: string;
};

export type AdminOrder = {
  id: string;
  order_number: string;
  user_id: string | null;
  customer_name: string | null;
  customer_phone: string | null;
  customer_email: string | null;
  shipping_address: string | null;
  status: string;
  currency: string;
  total_amount: number;
  items: unknown[];
  shipping_info?: unknown;
  created_at: string;
  profile?: AdminProfile | null;
  order_items?: AdminOrderItem[];
};

export type AdminOrderItem = {
  id?: string;
  order_id?: string;
  product_id: string;
  product_slug: string;
  product_name: string;
  product_brand: string;
  product_image_url: string | null;
  unit_price: number;
  quantity: number;
  subtotal_amount: number;
};

export type AdminProfile = {
  id: string;
  email: string;
  name?: string | null;
  full_name?: string | null;
  phone: string;
  address?: string | null;
  shipping_address?: string | null;
  created_at: string;
  order_count?: number;
};

export async function getAdminCategories() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []) as AdminCategory[];
}

export async function getAdminProducts() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as AdminProduct[];
}

export async function getAdminOrders() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  const orders = (data ?? []) as AdminOrder[];
  const userIds = Array.from(new Set(orders.map((order) => order.user_id).filter(Boolean))) as string[];

  const profileMap = new Map<string, AdminProfile>();
  if (userIds.length > 0) {
    const { data: profiles } = await supabase.from("profiles").select("*").in("id", userIds);
    (profiles ?? []).forEach((profile) => {
      profileMap.set(profile.id, profile as AdminProfile);
    });
  }

  const orderIds = orders.map((order) => order.id);
  const itemMap = new Map<string, AdminOrderItem[]>();
  if (orderIds.length > 0) {
    const { data: orderItems, error: orderItemsError } = await supabase
      .from("order_items")
      .select("*")
      .in("order_id", orderIds)
      .order("created_at", { ascending: true });

    if (!orderItemsError) {
      (orderItems ?? []).forEach((item) => {
        const row = item as AdminOrderItem;
        const items = itemMap.get(row.order_id ?? "") ?? [];
        items.push(row);
        itemMap.set(row.order_id ?? "", items);
      });
    }
  }

  return orders.map((order) => ({
    ...order,
    profile: order.user_id ? profileMap.get(order.user_id) ?? null : null,
    order_items: itemMap.get(order.id) ?? fallbackOrderItems(order)
  }));
}

export async function getAdminOrderById(id: string) {
  const orders = await getAdminOrders();
  return orders.find((order) => order.id === id) ?? null;
}

function fallbackOrderItems(order: AdminOrder): AdminOrderItem[] {
  if (!Array.isArray(order.items)) {
    return [];
  }

  return order.items
    .map((item) => item as Record<string, unknown>)
    .map((item) => ({
      product_id: String(item.product_id ?? ""),
      product_slug: String(item.slug ?? item.product_slug ?? ""),
      product_name: String(item.name ?? item.product_name ?? ""),
      product_brand: String(item.brand ?? item.product_brand ?? ""),
      product_image_url: String(item.image_url ?? item.product_image_url ?? ""),
      unit_price: Number(item.price ?? item.unit_price ?? 0),
      quantity: Number(item.quantity ?? 1),
      subtotal_amount: Number(item.amount ?? item.subtotal_amount ?? 0)
    }))
    .filter((item) => item.product_id || item.product_name);
}

export async function getAdminProfiles() {
  const supabase = createSupabaseAdminClient();
  const [{ data: profiles, error: profilesError }, { data: orders, error: ordersError }] = await Promise.all([
    supabase.from("profiles").select("*").order("created_at", { ascending: false }),
    supabase.from("orders").select("user_id")
  ]);

  if (profilesError) {
    return [];
  }

  if (ordersError) {
    return ((profiles ?? []) as AdminProfile[]).map((profile) => ({
      ...profile,
      order_count: 0
    }));
  }

  const orderCounts = new Map<string, number>();
  (orders ?? []).forEach((order) => {
    if (order.user_id) {
      orderCounts.set(order.user_id, (orderCounts.get(order.user_id) ?? 0) + 1);
    }
  });

  return ((profiles ?? []) as AdminProfile[]).map((profile) => ({
    ...profile,
    order_count: orderCounts.get(profile.id) ?? 0
  }));
}
