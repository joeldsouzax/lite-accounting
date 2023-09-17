create table users(
    id uuid references auth.users not null primary key,
    billing_address jsonb,
    payment_method jsonb
)