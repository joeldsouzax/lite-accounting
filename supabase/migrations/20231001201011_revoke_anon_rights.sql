alter default privileges in schema public revoke all on tables from anon;
alter default privileges in schema public revoke all on functions from anon;
alter default privileges in schema public revoke all on sequences from anon;

-- the above will only work for future database objects, to revoke current privileges 
revoke select on all tables in schema public from anon;
revoke usage on all sequences in schema public from anon;
revoke execute on all functions in schema public from anon;