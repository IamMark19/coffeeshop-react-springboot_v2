INSERT INTO products (id, name, description, created_at) VALUES (1, 'Americano', 'A classic hot coffee made with a shot of espresso and hot water.', CURRENT_TIMESTAMP);
INSERT INTO product_variants (product_id, size, price, stock, created_at) VALUES (1, 'small', 2.00, 100, CURRENT_TIMESTAMP);
INSERT INTO product_variants (product_id, size, price, stock, created_at) VALUES (1, 'medium', 2.50, 100, CURRENT_TIMESTAMP);
INSERT INTO product_variants (product_id, size, price, stock, created_at) VALUES (1, 'large', 3.00, 100, CURRENT_TIMESTAMP);

INSERT INTO products (id, name, description, created_at) VALUES (2, 'Cappuccino', 'A rich and frothy coffee with equal parts of espresso, steamed milk, and foam.', CURRENT_TIMESTAMP);
INSERT INTO product_variants (product_id, size, price, stock, created_at) VALUES (2, 'small', 2.50, 100, CURRENT_TIMESTAMP);
INSERT INTO product_variants (product_id, size, price, stock, created_at) VALUES (2, 'medium', 3.00, 100, CURRENT_TIMESTAMP);
INSERT INTO product_variants (product_id, size, price, stock, created_at) VALUES (2, 'large', 3.50, 100, CURRENT_TIMESTAMP);
