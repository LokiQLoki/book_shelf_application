CREATE SEQUENCE book_id_seq;

CREATE TABLE books (
    book_id bigint NOT NULL DEFAULT nextval('book_id_seq'::regclass),
    author VARCHAR(255) NOT NULL,
    book_name VARCHAR(255) NOT NULL
  );
  
  INSERT INTO books (author, book_name)
  VALUES  ('Rabindranath Tagore', 'Sesher Kobita');