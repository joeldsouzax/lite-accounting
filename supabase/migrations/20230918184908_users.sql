/**
* USERS
* Note: this table contain users data, Users should be able to view and update their own data
*/
create table users(
    -- UUID from auth.users
    id uuid references auth.users not null primary key on delete cascade,
    full_name text,
    -- customer's billing address, stored in JSON format
    billing_address jsonb,
    -- customer's payment instrument
    payment_method jsonb
);
-- postgres rls policy over users table
alter table users enable row level security;
create policy "Can view its own data." on users to autenticated for select using (auth.uid() = id);
create policy "Can update its own data" on users to autenticated for update using (auth.uid() = id);
create policy "Can delete its own data" on users to autenticated for delete using (auth.uid() = id);


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


-- on delete of users, delete auth.user as well
-- function to delete auth user when user wants to delete themself
create or replace function handle_delete_user()
returns trigger as $$
begin
    delete from auth.users where auth.users.id = OLD.id;
    return OLD;
end;
$$ language 'plpgsql' security definer;

create trigger on_user_delete
            after delete on public.users
            for each row execute procedure public.handle_delete_user();



/**
* Note: Revoke all privileges for anon users
*/
alter default privileges in schema public revoke all on tables from anon;
alter default privileges in schema public revoke all on functions from anon;
alter default privileges in schema public revoke all on sequences from anon;

-- the above will only work for future database objects, to revoke current privileges 
revoke select on all tables in schema public from anon;
revoke usage on all sequences in schema public from anon;
revoke execute on all functions in schema public from anon;