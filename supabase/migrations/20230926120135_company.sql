/**
* COMPANY: holds company id and company code, its the account for which transactions are recorded
**/
create table companies(
    id bigint generated always as identity primary key,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone,
    name varchar(160) not null default "no name",
    code text,
    user uuid not null,
    constraint companies_users_fkey foreign key (user) references auth.users(id) on delete cascade
);
-- postgres rls policy over companies table
alter table companies enable row level security;
create policy "can view its own companies" on companies to autenticated for select using (auth.uid() = user);
create policy "can update its own companies" on companies to autenticated for update using (auth.uid() = user);
create policy "can insert a new company" on companies to autenticated for insert using (true);

/**
* trigger automatically creates the first company when user signs in
*/
create function public.handle_new_company()
returns trigger as $$
begin
    insert into public.companies(user)
    values (new.id);
    return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_company_created
    after insert on auth.users
    for each row execute procedure public.handle_new_company();



-- enable moddatetime extension
create extension if not exists moddatetime schema extensions;

-- this will set the 'updated_at' column on every update
create trigger handle_company_updated_at
    before update on companies
    for each row execute procedure moddatetime (updated_at);