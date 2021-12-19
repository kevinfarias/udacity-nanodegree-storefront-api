CREATE TABLE products (
    id serial not null primary key,
    name character varying(1000) not null,
    price numeric(15, 2) not null,
    category integer not null references categories (id)
);