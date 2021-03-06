
TRUNCATE lifap5.quiz_user CASCADE;

-- select uuid_generate_v4() from generate_series(1,4);

INSERT INTO lifap5.quiz_user(user_id, firstname, lastname, api_key)
VALUES  ('romuald.thion',     'Romuald',  'Thion',    '4dd729fd-4709-427f-b371-9d177194c260'),
        ('emmanuel.coquery',  'Emmanuel', 'Coquery',  '7038e76c-7fc3-423f-bfaa-97a0872bdb68'),
        ('test.user',         'Test',     'User',     '944c5fdd-af88-47c3-a7d2-5ea3ae3147da'),
        ('other.user',        'Other',    'User',     '64decee2-acca-4a86-8e60-a46c4ccbca97');


-- inserts 250 users with random names
-- INSERT INTO lifap5.quiz_user(user_id, firstname, lastname) (
--   SELECT  'User #' || r.n::text,
--           'first' || r.n::text,
--           'last' || r.n::text
--   FROM generate_series(1, 250) AS g(i), LATERAL (SELECT floor(random()*1000000) AS n, i) AS r
-- )
-- ON CONFLICT DO NOTHING;