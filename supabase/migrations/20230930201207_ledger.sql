-- ledgers table containing all ledger data for a given year for a company
create table ledgers(
    id bigint generated always as identity primary key,
    created_at timestamp with time zone not null default now(),
    update_at timestamp with time zone,
    year date not null,
    name text,
    description text,
    company_id bigint not null references public.companies(id) on delete cascade,
    constraint year_must_be_1st_jan check (date_trunc('year', year) = year),
    constraint year_must_be_unique unique (year)
);

-- enable els on ledgers table and let users create, delete, update the ledger
alter table ledgers enable row level security;
create policy "users can view the ledgers if it belongs to their company" on ledgers for select using 
    (auth.uid() in (
        select user_id from public.companies
        where id = company_id
    ));

create policy "users can delete their ledgers if it belongs to their company" on ledgers for delete using
    (auth.uid() in (
        select user_id from public.companies
        where id = company_id
    ));

create policy "users can update their ledgers if it belongs to their company" on ledgers for update using
    (auth.uid() in (
        select user_id from public.companies
        where id = company_id
    ));





-- trigger automatically creates the first ledger when the users sign up
create function public.handle_new_ledger()
returns trigger as $$
begin
    insert into public.ledgers(company_id, year)
    values (new.id, date_trunc('year',current_date));
    return new;
end;
$$ language plpgsql security definer;

create trigger on_company_created
    after insert on public.companies
    for each row execute procedure public.handle_new_ledger();
