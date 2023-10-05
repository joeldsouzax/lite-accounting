-- account table
-- every user will have their own account table, a short cut for them to save their most usable accounts maybe.
-- deleting the user will also delete all the accounts this user has saved till now
create table accounts(
    id integer primary key generated always as identity,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone,
    name varchar(160) not null,
    account_code integer not null,
    description text,
    user_id uuid,
    constraint accounts_user_id_fkey foreign key (user_id) references auth.users(id) on delete cascade
);

-- enable row level security for accounts
alter table accounts enable row level security;
create policy "users can read their own accounts" on accounts for select to authenticated using (auth.uid() = user_id);
create policy "users can delete their own accounts" on accounts for delete to authenticated using (auth.uid() = users_id);
create policy "users can update their own accounts" on accounts for update to authenticated using (auth.uid() = users_id);
create policy "only authenticated users can insert" on accounts for insert to authenticated using (true);


-- entries table which holds the basic atom transaction entry
-- amount uses bigint
-- since we are only going to use one currency (nok) we do not need to store the magnifier for this currency
-- for reference https://www.linkedin.com/pulse/one-way-store-money-postgresql-database-benchmark-against-jason-lui/
create table entries(
    id bigint primary key generated always as identity,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone,
    transaction_date timestamp with time zone not null default now(),
    amount bigint not null check (amount > 0),
    name varchar(160) not null,
    description text,
    company_id integer not null,
    credit integer not null,
    debit integer not null,
    constraint entries_company_id_fkey foreign key (company_id) references public.companies(id) on delete cascade,
    constraint entries_credit_fkey foreign key (credit) references public.accounts(id) on delete restrict,
    constraint entries_debit_fkey foreign key (debit) references public.accounts(id) on delete restrict
    -- deletes are restricted because deleting an account with outstanding
    -- entries does not make sense. if the account's balance is non zero,
    -- it would make assets or liabilities vanish, and even if its zero,
    -- the account is responsible for the non zero balances of other accounts,
    -- so deleting it would lose important information.
);

-- enable row level security for entries table
-- only users can do anything over this table
-- if you roll out different roles pls take a look at this and update it https://supabase.com/docs/guides/auth/row-level-security
alter table entries enable row level security;
create policy "can view their companies transaction entries"
    on entries
    for select
    to authenticated
    using ( auth.uid() in (
        select user_id in public.companies
        where id = company_id
    ));

create policy "can update their companies transaction entries"
    on entries
    for update
    to authenticated
    using ( auth.uid() in (
        select user_id in public.companies
        where id = company_id
    ));

create policy "can delete their companies transaction entries"
    on entries
    for delete
    to authenticated
    using (auth.uid() in (
        select user_id in public.companies
        where id = company_id
    ));

create policy "only authenticated users can insert"
    on entries
    for insert
    to authenticated
    using (true);


-- create a trigger to update the updated_at column when an entry is updated
create trigger handle_entry_updated_at
    before update on entries
    for each row execute procedure moddatetime (updated_at);
