create table IF NOT EXISTS post
(id SERIAL PRIMARY KEY ,
 title varchar NOT NULL,
 content text,
  imageUrl varchar,
 creator varchar ,
 creaedAt timestamp DEFAULT NOW());

insert into post (title,content,imageUrl,creator)
values ('My Post', 'My First Post', 'dummy', 'yair');
