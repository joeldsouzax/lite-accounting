-- alter the foreign key in companies and add on delete cascade
alter table public.companies drop constraint companies_users_fkey;
alter table public.companies add constraint companies_users_fkey foreign key (user_id) references auth.users(id) on delete cascade;

-- alter the foreign key constraint on users.id to add on delete cascade
alter table public.users drop constraint users_id_fkey;
alter table public.users add constraint users_id_fkey foreign key (id) references auth.users(id) on delete cascade;