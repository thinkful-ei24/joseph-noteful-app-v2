-- psql -U dev -d noteful-app -f ./db/noteful.sql

DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS notes_tags CASCADE;
DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS folders;


CREATE TABLE folders (
  id serial PRIMARY KEY,
  name text NOT NULL
);

ALTER SEQUENCE folders_id_seq RESTART WITH 100;

CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  title text NOT NULL,
  content text NOT NULL,
  created timestamp DEFAULT now(),
  folder_id int REFERENCES folders(id) ON DELETE SET NULL
);

ALTER SEQUENCE notes_id_seq RESTART WITH 100;

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name text NOT NULL
);
ALTER SEQUENCE tags_id_seq RESTART WITH 100;

CREATE TABLE notes_tags (
  note_id INTEGER NOT NULL REFERENCES notes ON DELETE CASCADE,
  tag_id INTEGER NOT NULL REFERENCES tags ON DELETE CASCADE
);

INSERT INTO folders (id,name) VALUES
  (1,'Archive'),
  (2,'Drafts'),
  (3,'Personal'),
  (4,'Work');


INSERT INTO notes (id,folder_id, title, content) VALUES 
  (1,1,'5 life lessons learned from cats',
   'intial content lorem ipsum'),
  (2,1,'What the government doesnt want you to know about cats',
   'intial content lorem ipsum'), 
  (3,1,'The most boring article about cats youll ever read',
   'intial content lorem ipsum'), 
  (4,2,'7 things lady gaga has in common with cats',
   'intial content lorem ipsum'), 
  (5,3,'The most incredible article about cats youll ever read',
   'intial content lorem ipsum'), 
  (6,2,'10 ways cats can help you live to 100',
   'intial content lorem ipsum'), 
  (7,2,'9 reasons you can blame the recession on cats',
   'intial content lorem ipsum'), 
  (8,null,'10 ways marketers are making you addicted to cats',
   'intial content lorem ipsum'), 
  (9,null, '11 ways investing in cats can make you a millionaire',
   'intial content lorem ipsum'), 
  ( 10,null,'Why you should forget everything you learned about cats',
   'intial content lorem ipsum');


INSERT INTO tags (id, name) VALUES
  (1,'stuff'),
  (2, 'yay'),
  (3, 'cats');

INSERT INTO notes_tags (note_id, tag_id) VALUES
  (1,1),
  (1,2),
  (2,3),
  (2,1);


