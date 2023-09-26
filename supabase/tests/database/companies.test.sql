begin;
select plan(2);

select col_is_pk('public','companies','id', 'id is private key for company');
select fk_ok('public', 'companies', 'user_id', 'auth', 'users', 'id', 'companies are connected to user');

select * from finish();
rollback;