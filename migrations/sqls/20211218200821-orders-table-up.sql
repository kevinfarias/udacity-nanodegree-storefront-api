CREATE TABLE orders (
    id serial not null primary key,
    product integer not null references products (id),
    quantity integer not null,
    userId integer not null references users (id),
    complete boolean not null default false
);