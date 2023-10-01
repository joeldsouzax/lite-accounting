/**
* COMPANY: holds company id and company code, its the account for which transactions are recorded
**/
create table companies(
    id bigint generated always as identity primary key,
    created_at timestamp with time zone not null default now(),
    company_name text,
    company_code text,
    user_id uuid not null,
    constraint companies_users_fkey foreign key (user_id) references auth.users(id)
);
-- postgres rls policy over companies table
alter table companies enable row level security;
create policy "can view its own companies" on companies for select using (auth.uid() = user_id);
create policy "can update its own companies" on companies for update using (auth.uid() = user_id);

/**
* trigger automatically creates the first company when user signs in
*/
create function public.handle_new_company()
returns trigger as $$
begin
    insert into public.companies(user_id)
    values (new.id);
    return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_company_created
    after insert on auth.users
    for each row execute procedure public.handle_new_company();