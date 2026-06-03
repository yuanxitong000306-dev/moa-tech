create extension if not exists "pgcrypto";

create table if not exists public.categories (
  id text primary key,
  name text not null,
  description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id text primary key,
  slug text not null unique,
  name text not null,
  brand text not null,
  category_id text not null references public.categories(id) on update cascade,
  category_name text not null,
  price integer not null default 0,
  badge text not null default 'NEW',
  is_hot boolean not null default false,
  is_new boolean not null default true,
  image_url text not null,
  short_description text not null,
  specs jsonb not null default '[]'::jsonb,
  delivery text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  user_id uuid references auth.users(id) on delete set null,
  customer_name text,
  customer_phone text,
  customer_email text,
  shipping_address text,
  status text not null default 'pending',
  currency text not null default 'KRW',
  total_amount integer not null default 0,
  items jsonb not null default '[]'::jsonb,
  shipping_info jsonb not null default '{}'::jsonb,
  payment_provider text,
  payment_key text,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text not null default '',
  address text not null default '',
  full_name text not null,
  phone text not null,
  shipping_address text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text not null references public.products(id) on update cascade,
  product_slug text not null,
  product_name text not null,
  product_brand text not null,
  product_image_url text,
  unit_price integer not null default 0,
  quantity integer not null default 1,
  subtotal_amount integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id text primary key,
  hero_title text not null default 'Smart Life,
Better Choice.',
  hero_subtitle text not null default '검증된 브랜드와 고품질 제품으로
더 스마트한 일상을 경험하세요.',
  hero_button_text text not null default '쇼핑 바로가기',
  hero_button_url text not null default '#all-products',
  hero_image_url text not null default '/products/apple-ecosystem-desk.png',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.orders add column if not exists user_id uuid references auth.users(id) on delete set null;
alter table public.orders add column if not exists shipping_address text;
alter table public.orders add column if not exists shipping_info jsonb not null default '{}'::jsonb;
alter table public.profiles add column if not exists name text not null default '';
alter table public.profiles add column if not exists address text not null default '';
alter table public.profiles add column if not exists full_name text not null default '';
alter table public.profiles add column if not exists shipping_address text not null default '';
update public.profiles
set
  name = coalesce(nullif(name, ''), nullif(full_name, ''), email),
  address = coalesce(nullif(address, ''), nullif(shipping_address, ''), '')
where name = '' or address = '';

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists categories_set_updated_at on public.categories;
create trigger categories_set_updated_at
before update on public.categories
for each row execute function public.set_updated_at();

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.profiles enable row level security;
alter table public.order_items enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "Public categories are readable" on public.categories;
create policy "Public categories are readable"
on public.categories for select
using (true);

drop policy if exists "Public products are readable" on public.products;
create policy "Public products are readable"
on public.products for select
using (true);

drop policy if exists "Public site settings are readable" on public.site_settings;
create policy "Public site settings are readable"
on public.site_settings for select
using (true);

drop policy if exists "Authenticated users can manage site settings" on public.site_settings;
create policy "Authenticated users can manage site settings"
on public.site_settings for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated users can manage categories" on public.categories;
create policy "Authenticated users can manage categories"
on public.categories for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated users can manage products" on public.products;
create policy "Authenticated users can manage products"
on public.products for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated users can read orders" on public.orders;
drop policy if exists "Users can read own orders" on public.orders;
create policy "Users can read own orders"
on public.orders for select
using (auth.uid() = user_id);

drop policy if exists "Users can create own orders" on public.orders;
create policy "Users can create own orders"
on public.orders for insert
with check (auth.uid() = user_id);

drop policy if exists "Authenticated users can manage orders" on public.orders;
create policy "Authenticated users can manage orders"
on public.orders for update
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

drop policy if exists "Users can read own order items" on public.order_items;
create policy "Users can read own order items"
on public.order_items for select
using (
  exists (
    select 1 from public.orders
    where orders.id = order_items.order_id
    and orders.user_id = auth.uid()
  )
);

drop policy if exists "Users can create own order items" on public.order_items;
create policy "Users can create own order items"
on public.order_items for insert
with check (
  exists (
    select 1 from public.orders
    where orders.id = order_items.order_id
    and orders.user_id = auth.uid()
  )
);

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
on public.profiles for select
using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
on public.profiles for insert
with check (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = excluded.public;

insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Product images are publicly readable" on storage.objects;
create policy "Product images are publicly readable"
on storage.objects for select
using (bucket_id = 'product-images');

drop policy if exists "Site assets are publicly readable" on storage.objects;
create policy "Site assets are publicly readable"
on storage.objects for select
using (bucket_id = 'site-assets');

drop policy if exists "Authenticated users can upload product images" on storage.objects;
create policy "Authenticated users can upload product images"
on storage.objects for insert
with check (bucket_id = 'product-images' and auth.role() = 'authenticated');

drop policy if exists "Authenticated users can upload site assets" on storage.objects;
create policy "Authenticated users can upload site assets"
on storage.objects for insert
with check (bucket_id = 'site-assets' and auth.role() = 'authenticated');

drop policy if exists "Authenticated users can update product images" on storage.objects;
create policy "Authenticated users can update product images"
on storage.objects for update
using (bucket_id = 'product-images' and auth.role() = 'authenticated')
with check (bucket_id = 'product-images' and auth.role() = 'authenticated');

drop policy if exists "Authenticated users can update site assets" on storage.objects;
create policy "Authenticated users can update site assets"
on storage.objects for update
using (bucket_id = 'site-assets' and auth.role() = 'authenticated')
with check (bucket_id = 'site-assets' and auth.role() = 'authenticated');

drop policy if exists "Authenticated users can delete product images" on storage.objects;
create policy "Authenticated users can delete product images"
on storage.objects for delete
using (bucket_id = 'product-images' and auth.role() = 'authenticated');

drop policy if exists "Authenticated users can delete site assets" on storage.objects;
create policy "Authenticated users can delete site assets"
on storage.objects for delete
using (bucket_id = 'site-assets' and auth.role() = 'authenticated');
