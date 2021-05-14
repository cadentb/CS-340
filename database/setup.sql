DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `customerID` int(11) NOT NULL AUTO_INCREMENT,
  `houseID` int(11),
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  CONSTRAINT `cToh` FOREIGN KEY (`houseID`) REFERENCES `greekHouses` (`houseID`),
  PRIMARY KEY (`customerID`)
)ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`(
  `orderID` int(11) NOT NULL AUTO_INCREMENT,
  `productID` int(11) NOT NULL,
  `customerID` int(11) NOT NULL,
  `shipStreet` varchar(255) NOT NULL,
  `shipCity` varchar(255) NOT NULL,
  `shipState` varchar(255) NOT NULL,
  `shipZip` int(11) NOT NULL,
  CONSTRAINT `oToc` FOREIGN KEY (`customerID`) REFERENCES `customers` (`customerID`),
  CONSTRAINT `oTop` FOREIGN KEY (`productID`) REFERENCES `products` (`productID`),
  PRIMARY KEY (`orderID`)
)ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products`(
  `productID` int(11) NOT NULL AUTO_INCREMENT,
  `orderID` int (11) NOT NULL,
  `houseID` int (11) NOT NULL,
  `category` varchar(255),
  `price` decimal(4,2),
  `name` varchar(255) NOT NULL,
  `quantityInStock` int(11) NOT NULL,
  CONSTRAINT `pToo` FOREIGN KEY (`orderID`) REFERENCES `orders` (`orderID`),
  CONSTRAINT `pTog` FOREIGN KEY (`houseID`) REFERENCES `greekHouses` (`houseID`),
  PRIMARY KEY (`productID`)
)ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `greekHouses`;
CREATE TABLE `greekHouses`(
  `houseID` int(11) NOT NULL AUTO_INCREMENT,
  `productID` int(11) NOT NULL,
  `letters` varchar(255) NOT NULL,
  `nickname`varchar(255),
  PRIMARY KEY(`houseID`)
)ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;


INSERT INTO customers(firstName, lastName, email) VALUES ('Matthew','Brayton','mb@mail.mail')
INSERT INTO customers(firstName, lastName, email) VALUES ('Caden','Burke','cb@mail.mail')

INSERT INTO orders(shipStreet, shipCity, shipState, shipZip) VALUES ('thisStreet','thatCity','theState','99999')

INSERT INTO products(category, price, name, quantityInStock) VALUES ('Hoodie', '39.99', 'THE BEST HOODIE EVER', '99')

INSERT INTO greekHouses(letters, nickname) VALUES ('Alpha Tau Omega', 'ATO')
