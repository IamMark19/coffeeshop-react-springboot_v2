USE coffee_shop;
GO

-- =====================================
-- Seed Users
-- =====================================
INSERT INTO users (name, email, password, role) VALUES
('Alice Johnson', 'alice@example.com', 'password123', 'customer'),
('Bob Smith', 'bob@example.com', 'password456', 'admin');
GO

-- =====================================
-- Seed Products
-- =====================================
INSERT INTO products (name, type, description, image) VALUES
('Americano', 'hot', 'A classic hot coffee made with a shot of espresso and hot water.', '/images/coffee/hot-americano.jpeg'),
('Cappuccino', 'hot', 'A rich and frothy coffee with equal parts of espresso, steamed milk, and foam.', '/images/coffee/hot-cappuccino.jpeg'),
('Caramel Macchiato', 'hot', 'Velvety espresso and steamed milk topped with a decadent caramel drizzle.', '/images/coffee/hot-caramel-macchiato.jpg'),
('Chocolate', 'hot', 'Creamy and indulgent hot chocolate, perfect for chocolate lovers.', '/images/coffee/hot-chocolate.jpg'),
('Espresso', 'hot', 'A bold and intense shot of espresso, a true coffee enthusiast''s choice.', '/images/coffee/hot-espresso.jpeg'),
('Fiter Coffee', 'hot', 'A bold and smooth brew of premium coffee beans using the traditional filter method.', '/images/coffee/hot-fiter-coffee.jpeg'),
('Flat White', 'hot', 'A velvety coffee with espresso and microfoam, for a smooth and balanced flavor.', '/images/coffee/hot-flat-white.jpg'),
('Latte', 'hot', 'Espresso mixed with steamed milk, delivering a mellow and creamy taste.', '/images/coffee/hot-latte.jpeg'),
('Matcha Latte', 'hot', 'A comforting blend of matcha green tea and steamed milk for a unique and soothing experience.', '/images/coffee/hot-matcha-latte.jpeg'),
('Mocha', 'hot', 'Espresso combined with rich chocolate and steamed milk, a delightful chocolatey coffee treat.', '/images/coffee/hot-mocha.jpeg'),
('Iced Americano', 'iced', 'Chilled coffee made by diluting espresso with cold water, served over ice.', '/images/coffee/iced-americano.jpeg'),
('Iced Cappuccino', 'iced', 'A refreshing iced version of the classic cappuccino with espresso, cold milk, and foam.', '/images/coffee/iced-cappuccino.jpg'),
('Iced Caramel Macchiato', 'iced', 'Cool espresso over ice, blended with cold milk, and finished with a swirl of caramel.', '/images/coffee/iced-caramel-macchiato.jpeg'),
('Cold Brew Latte', 'iced', 'Smooth and velvety cold brew coffee mixed with cold milk for a creamy iced latte.', '/images/coffee/iced-cold-brew-latte.jpeg'),
('Cold Brew', 'iced', 'Bold and refreshing cold brew coffee, a perfect pick-me-up on a hot day.', '/images/coffee/iced-cold-brew.jpeg'),
('Iced Green Tea', 'iced', 'Iced green tea for a cool and antioxidant-packed beverage.', '/images/coffee/iced-green-tea.jpeg'),
('Iced Latte', 'iced', 'Chilled espresso mixed with cold milk, a refreshing and energizing iced latte.', '/images/coffee/iced-latte.jpeg'),
('Iced Matcha', 'iced', 'Cold matcha green tea served over ice, a vibrant and revitalizing drink.', '/images/coffee/iced-matcha.jpeg'),
('Iced Mocha', 'iced', 'Iced coffee with a decadent blend of chocolate and espresso, a delightful cold chocolate coffee treat.', '/images/coffee/iced-mocha.jpeg');
GO

-- =====================================
-- Seed Product Variants (small/medium/large)
-- =====================================
-- Use the IDs you provided (20-76)
INSERT INTO product_variants (product_id, size, price, stock) VALUES
(1,'small',1500,100),(1,'medium',2000,80),(1,'large',2500,50),
(2,'small',2000,100),(2,'medium',2500,80),(2,'large',3000,50),
(3,'small',2500,100),(3,'medium',3000,80),(3,'large',3500,50),
(4,'small',2500,100),(4,'medium',3000,80),(4,'large',3500,50),
(5,'small',1000,100),(5,'medium',1500,80),(5,'large',2000,50),
(6,'small',2000,100),(6,'medium',2500,80),(6,'large',3000,50),
(7,'small',2500,100),(7,'medium',3000,80),(7,'large',3500,50),
(8,'small',2000,100),(8,'medium',2500,80),(8,'large',3000,50),
(9,'small',3000,100),(9,'medium',3500,80),(9,'large',4000,50),
(10,'small',3000,100),(10,'medium',3500,80),(10,'large',4000,50),
(11,'small',2000,100),(11,'medium',2500,80),(11,'large',3000,50),
(12,'small',2500,100),(12,'medium',3000,80),(12,'large',3500,50),
(13,'small',2500,100),(13,'medium',3000,80),(13,'large',3500,50),
(14,'small',3500,100),(14,'medium',4000,80),(14,'large',4500,50),
(15,'small',2500,100),(15,'medium',3000,80),(15,'large',3500,50),
(16,'small',1500,100),(16,'medium',2000,80),(16,'large',2500,50),
(17,'small',2000,100),(17,'medium',2500,80),(17,'large',3000,50),
(18,'small',3000,100),(18,'medium',3500,80),(18,'large',4000,50),
(19,'small',3000,100),(19,'medium',3500,80),(19,'large',4000,50);
GO

-- =====================================
-- Seed Orders
-- =====================================
INSERT INTO orders (user_id, order_date, status, total) VALUES
(1,'2025-09-15 10:00:00','pending',8000),
(2,'2025-09-15 11:30:00','completed',6000);
GO

-- =====================================
-- Seed Order Items
-- =====================================
INSERT INTO order_items (order_id, product_variant_id, quantity, price) VALUES
(1,21,2,2000),   -- Medium Americano
(1,23,1,2000),   -- Small Cappuccino
(2,43,1,3000),   -- Large Latte
(2,57,1,3000);   -- Medium Iced Caramel Macchiato
GO

-- =====================================
-- Seed Inventory Logs
-- =====================================
INSERT INTO inventory_logs (product_variant_id, change_qty, log_date) VALUES
(21,-2,'2025-09-15 10:05:00'),
(23,-1,'2025-09-15 10:05:00'),
(43,-1,'2025-09-15 11:35:00'),
(57,-1,'2025-09-15 11:35:00');
GO
