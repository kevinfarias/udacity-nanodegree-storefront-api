CREATE TABLE users (
    id serial not null primary key,
    "firstName" character varying(1000) not null,
    "lastName" character varying(1000) not null,
    password character varying(1000) not null
);