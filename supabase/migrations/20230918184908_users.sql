/**
* USERS
* Note: this table contain users data, Users should be able to view and update their own data
*/
create table users(
    -- UUID from auth.users
    id uuid references auth.users not null primary key,
    full_name text,
    -- customer's billing address, stored in JSON format
    billing_address jsonb,
    -- customer's payment instrument
    payment_method jsonb
);
-- postgres rls policy over users table
alter table users enable row level security;
create policy "Can view its own data." on users for select using (auth.uid() = id);
create policy "Can update its own data" on users for update using (auth.uid() = id);


/**
* This trigger automatically creates a user entry when a new user signs up via Supabase Auth.
*/
create function public.handle_new_user()
returns trigger as $$
begin
    insert into public.users (id, full_name)
    values (new.id, new.raw_user_meta_data->>'full_name');
    return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

