-- Chạy toàn bộ file này trong Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null default 'User',
  balance bigint not null default 30 check (balance >= 0),
  role text not null default 'user' check (role in ('user','admin')),
  status text not null default 'active' check (status in ('active','blocked')),
  created_at timestamptz not null default now()
);

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  amount bigint not null,
  type text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.tool_usage (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  tool_id text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.transactions enable row level security;
alter table public.tool_usage enable row level security;

drop policy if exists "profiles own read" on public.profiles;
create policy "profiles own read" on public.profiles for select to authenticated using (auth.uid()=id);

drop policy if exists "transactions own read" on public.transactions;
create policy "transactions own read" on public.transactions for select to authenticated using (auth.uid()=user_id);

drop policy if exists "usage own read" on public.tool_usage;
create policy "usage own read" on public.tool_usage for select to authenticated using (auth.uid()=user_id);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path=public
as $$
begin
  insert into public.profiles(id,username) values
    (new.id, coalesce(nullif(new.raw_user_meta_data->>'username',''),'User'));
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.admin_adjust_balance(target_user_id uuid, amount bigint, reason text)
returns void language plpgsql security definer set search_path=public
as $$
declare actor_role text;
begin
  select role into actor_role from public.profiles where id=auth.uid();
  if actor_role <> 'admin' then raise exception 'Không có quyền admin'; end if;
  if amount = 0 then raise exception 'Số tiền không hợp lệ'; end if;
  update public.profiles set balance=balance+amount where id=target_user_id and balance+amount>=0;
  if not found then raise exception 'Không đủ số dư hoặc user không tồn tại'; end if;
  insert into public.transactions(user_id,amount,type,description)
  values(target_user_id,amount,'admin_adjust',reason);
end $$;

-- Sau khi tạo tài khoản đầu tiên, đặt tài khoản của bạn thành admin:
-- update public.profiles set role='admin' where id='UUID_CUA_BAN';
