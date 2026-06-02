import { createClient } from "@supabase/supabase-js";
import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "src", "data", "products.json");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const products = JSON.parse(await fs.readFile(productsPath, "utf8"));

const categoryMap = new Map();
for (const product of products) {
  if (!categoryMap.has(product.category)) {
    categoryMap.set(product.category, {
      id: product.category,
      name: product.categoryName,
      description: "",
      sort_order: categoryMap.size + 1
    });
  }
}

const { error: categoryError } = await supabase
  .from("categories")
  .upsert([...categoryMap.values()], { onConflict: "id" });

if (categoryError) {
  throw categoryError;
}

const rows = products.map((product) => ({
  id: product.id,
  slug: product.slug,
  name: product.name,
  brand: product.brand,
  category_id: product.category,
  category_name: product.categoryName,
  price: product.price,
  badge: product.badge,
  is_hot: product.isHot,
  is_new: product.isNew,
  image_url: product.image,
  short_description: product.shortDescription,
  specs: product.specs,
  delivery: product.delivery
}));

const { error: productError } = await supabase
  .from("products")
  .upsert(rows, { onConflict: "id" });

if (productError) {
  throw productError;
}

console.log(`Migrated ${categoryMap.size} categories and ${rows.length} products.`);
