begin;
select plan(3);

select has_column('public', 'users', 'id', 'id should exist');
select col_is_pk('public', 'users', 'id', 'id should be a private key');
select fk_ok('public', 'users', 'id', 'auth', 'users', 'id', 'public users should have a foreign key to auth users');


select * from finish(true);
rollback;
