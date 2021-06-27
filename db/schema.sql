DROP TABLE IF EXISTS basic_items;

CREATE TABLE basic_items (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  category_name VARCHAR(30) NOT NULL,
  item_name VARCHAR(50) NOT NULL,
  main_function VARCHAR(50) NOT NULL,
  item_description TEXT
);
