import productsData from "@/data/products.json";
import { createClient } from "@supabase/supabase-js";

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  categoryName: string;
  price: number;
  badge: string;
  isHot: boolean;
  isNew: boolean;
  image: string;
  shortDescription: string;
  specs: string[];
  delivery: string;
};

export const products = productsData as Product[];

type SupabaseProductRow = {
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
  specs: string[] | null;
  delivery: string;
};

function mapSupabaseProduct(row: SupabaseProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand,
    category: row.category_id,
    categoryName: row.category_name,
    price: row.price,
    badge: row.badge,
    isHot: row.is_hot,
    isNew: row.is_new,
    image: row.image_url,
    shortDescription: row.short_description,
    specs: row.specs ?? [],
    delivery: row.delivery
  };
}

export async function getAllProducts() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return products;
  }

  const supabase = createClient(url, anonKey);
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return products;
  }

  return (data as SupabaseProductRow[]).map(mapSupabaseProduct);
}

export function formatPrice(price: number) {
  if (price <= 0) {
    return "가격 문의";
  }

  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0
  }).format(price);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export async function getProductBySlugAsync(slug: string) {
  const allProducts = await getAllProducts();
  return allProducts.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: string) {
  return products.filter((product) => product.category === category);
}

export async function getProductsByCategoryAsync(category: string) {
  const allProducts = await getAllProducts();
  return allProducts.filter((product) => product.category === category);
}

export function getHotProducts() {
  return products.filter((product) => product.isHot).slice(0, 4);
}

export function getNewProducts() {
  return products.filter((product) => product.isNew).slice(0, 4);
}
