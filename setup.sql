
DROP TABLE IF EXISTS 'customers';
CREATE TABLE 'customers'(
  'customerID' int(11) NOT NULL AUTO_INCREMENT,
  'houseID' int(11),
  'firstName' varchar(255) NOT NULL,
  'lastName' varchar(255) DEFAULT NULL,
  'email' varchar(255) NOT NULL,
  FOREIGN KEY ('houseID') REFERENCES 'greekHouses',
  PRIMARY KEY ('customerID')
)ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS 'orders'
CREATE TABLE 'orders'(
  'orderID' int(11) NOT NULL AUTO_INCREMENT,
  'productID' int(11) NOT NULL,
  'customerID' int(11) NOT NULL,
  'shipStreet' varchar(255) NOT NULL,
  'shipCity' varchar(255) NOT NULL,
  'shipState' varchar(255) NOT NULL,
  'shipZip' int(11) NOT NULL,
  FOREIGN KEY ('customerID') REFERENCES 'customers',
  FOREIGN KEY ('productID') REFERENCES 'products',
  PRIMARY KEY ('orderID')
)ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS 'products'
CREATE TABLE 'products'(
  'productID' int(11) NOT NULL AUTO_INCREMENT,
  'orderID' int (11) NOT NULL,
  'houseID' int (11) NOT NULL,
  'category' varchar(255),
  'price' decimal(4,2),
  'name' varchar(255) NOT NULL,
  'quantityInStock' int(11) NOT NULL,
  FOREIGN KEY ('orderID') REFERENCES 'orders',
  FOREIGN KEY ('houseID') REFERENCES 'greekHouses',
  PRIMARY KEY ('productID')
)ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS 'greekHouses'
CREATE TABLE 'greekHouses'(
  'houseID' int(11) NOT NULL AUTO_INCREMENT,
  'productID' int(11) NOT NULL,
  'letters' varchar(255) NOT NULL,
  'nickname'varchar(255),
  PRIMARY KEY('houseID')
)
