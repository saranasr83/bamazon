DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT(100) NOT NULL auto_increment,
  Product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price FLOAT(10,2) NOT NULL,
  stock_quantity FLOAT(10,2) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (Product_name,department_name,price,stock_quantity)
VALUES ("Iphone","electronic", 450, 50),("TV","electronic", 750, 40),
("Tent","outdoor", 50, 150), ("Bike","sport", 150, 80), 
("Grill","outdoor", 350, 20),("Shoes","shoe", 150, 250),
("Sunglasses","accesories", 100, 60), ("Lip stick","makeup", 20, 350), 
("Alexa","electronic", 150, 10), ("Watch","accesories", 250, 70);

SELECT * FROM products;
