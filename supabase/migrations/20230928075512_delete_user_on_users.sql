
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
