INSERT INTO customers(firstName, lastName, email)
VALUES (:firstNameValue, :lastNameValue, :emailValue)

INSERT INTO orders(shipStreet, shipCity, shipState, shipZip)
VALUES (shipStreetValue, shipCityValue, shipStateValue, shipZipValue)

INSERT INTO products(category, price, name, quantityInStock)
VALUES (categoryValue, priceValue, nameValue, quantityInStockValue)

INSERT INTO greekHouses(letters, nickname)
VALUES (lettersValue, nicknameValue)
