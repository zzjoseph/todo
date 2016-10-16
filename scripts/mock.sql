INSERT INTO lists (id, name, user_id) VALUES (1, 'homeworks', 1);
INSERT INTO lists (id, name, user_id) VALUES (2, 'projects', 1);
INSERT INTO items (id, description, due, list_id, created_at, updated_at) VALUES
(1, 'cse 3341 homework 4', '2016-10-24 15:00:00', 1, '2016-10-13 01:20:00', '2016-10-13 01:20:00');
INSERT INTO items (id, description, due, list_id, created_at, updated_at) VALUES
(2, 'cse 3341 project 2', '2016-10-27 23:59:59', 2, 'now', 'now');
