
DROP TABLE IF EXISTS customers;
CREATE TABLE customers(
  customerID int(11) NOT NULL AUTO_INCREMENT,
  houseID int(11),
  firstName varchar(255) NOT NULL,
  lastName varchar(255) DEFAULT NULL,
  email varchar(255) NOT NULL,
  FOREIGN KEY (houseID) REFERENCES greekHouses(houseID),
  PRIMARY KEY (customerID)
)ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS orders;
CREATE TABLE orders(
  orderID int(11) NOT NULL AUTO_INCREMENT,
  customerID int(11) NOT NULL,
  shipStreet varchar(255) NOT NULL,
  shipCity varchar(255) NOT NULL,
  shipState varchar(255) NOT NULL,
  shipZip int(11) NOT NULL,
  FOREIGN KEY (customerID) REFERENCES customers(customerID),
  PRIMARY KEY (orderID)
)ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS products;
CREATE TABLE products(
  productID int(11) NOT NULL AUTO_INCREMENT,
  category varchar(255),
  price decimal(4,2),
  name varchar(255) NOT NULL,
  quantityInStock int(11) NOT NULL,
  PRIMARY KEY (productID)
)ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS greekHouses;
CREATE TABLE greekHouses(
  houseID int(11) NOT NULL AUTO_INCREMENT,
  letters varchar(255) NOT NULL,
  nickname varchar(255),
  PRIMARY KEY(houseID)
)ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS products_greekHouses;
CREATE TABLE products_greekHouses(
  houseID int(11) NOT NULL,
  productID int(11) NOT NULL,
  FOREIGN KEY (houseID) REFERENCES greekHouses(houseID),
  FOREIGN KEY (productID) REFERENCES products(productID),
  PRIMARY KEY(houseID, productID)
);

DROP TABLE IF EXISTS products_orders;
CREATE TABLE products_orders(
  orderID int(11) NOT NULL,
  productID int(11) NOT NULL,
  productQty int(11) NOT NULL,
  FOREIGN KEY (orderID) REFERENCES orders(orderID),
  FOREIGN KEY (productID) REFERENCES products(productID),
  PRIMARY KEY(orderID, productID)
);