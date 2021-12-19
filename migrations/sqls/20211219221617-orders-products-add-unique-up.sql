ALTER TABLE orders_products
    ADD CONSTRAINT uk_orders_products unique (product, orderid);