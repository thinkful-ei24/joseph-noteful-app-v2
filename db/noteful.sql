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

INSERT INTO folders (name) VALUES
  ('Archive'),
  ('Drafts'),
  ('Personal'),
  ('Work');


INSERT INTO notes (title, content) VALUES 
  ('5 life lessons learned from cats',
   'intial content lorem ipsum'),
  ('What the government doesnt want you to know about cats',
   'intial content lorem ipsum'), 
  ('The most boring article about cats youll ever read',
   'intial content lorem ipsum'), 
  ('7 things lady gaga has in common with cats',
   'intial content lorem ipsum'), 
  ('The most incredible article about cats youll ever read',
   'intial content lorem ipsum'), 
  ('10 ways cats can help you live to 100',
   'intial content lorem ipsum'), 
  ('9 reasons you can blame the recession on cats',
   'intial content lorem ipsum'), 
  ('10 ways marketers are making you addicted to cats',
   'intial content lorem ipsum'), 
  ( '11 ways investing in cats can make you a millionaire',
   'intial content lorem ipsum'), 
  ( 'Why you should forget everything you learned about cats',
   'intial content lorem ipsum');

INSERT INTO notes (title, content, folder_id) VALUES
  (
    '5 life lessons learned from cats',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
    100
  );




