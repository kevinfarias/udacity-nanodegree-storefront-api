create table orders_products (
    id bigserial not null primary key,
    product integer not null references products (id),
    orderid integer not null references orders (id),
    quantity integer not null
);

alter table orders
    drop column if exists quantity;

alter table orders
    drop column if exists product;