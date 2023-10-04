--- account table
create table accounts(
    id integer primary key generated as identity,
    created_at timestamp with time zone not null default now(),
    name text not null,
    description text,
);

-- entries table which holds the basic atom transaction entry
create table entries(
    id integer primary key generated always as identity,
    created_at timestamp with time zone not null default now(),
    name text,
    updated_at timestamp with time zone,
    transaction_date_time timestamp with time zone not null,  
);