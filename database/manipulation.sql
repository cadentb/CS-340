-- Insertion queries --
INSERT INTO customers(firstName, lastName, email)
VALUES (:firstNameValue, :lastNameValue, :emailValue);

INSERT INTO orders(shipStreet, shipCity, shipState, shipZip)
VALUES (:shipStreetValue, :shipCityValue, :shipStateValue, :shipZipValue);

INSERT INTO products(category, price, name, quantityInStock)
VALUES (:categoryValue, :priceValue, :nameValue, :quantityInStockValue);

INSERT INTO greekHouses(letters, nickname)
VALUES (:lettersValue, :nicknameValue);


-- Searching queries --
SELECT customerID, houseID, firstName, lastName, email
FROM customers
WHERE customerID = :selectedCustomerID

SELECT orderID, shipStreet, shipCity, shipState, shipZip
FROM orders
WHERE orderID = :selectedOrderID

SELECT productID, category, price, name, quantityInStock
FROM products
WHERE productID = :selectedProductID

SELECT houseID, letters, nickname
FROM greekhouses
WHERE houseID = :selectedHouseID


-- Delete Queries --
DELETE FROM customers
WHERE customerID = :selectedCustomerID

DELETE FROM orders
WHERE orderID = :selectedOrderID

DELETE FROM products
WHERE productID = :selectedProductID

DELETE FROM greekhouses
WHERE houseID = :selectedHouseID


-- Update Queries --
UPDATE customers
SET firstName = :firstNameInput, lastName = :lastNameInput, email = :emailInput
WHERE customerID = :selectedCustomerID

UPDATE orders
SET shipStreet = :shipStreetInput, shipCity = :shipCityInput, shipState = :shipStateInput, shipZip = shipZipInput
WHERE orderID = :selectedOrderID

UPDATE products
SET category = :categoryInput, price = :priceInput, name = :nameInput, quantityInStock = :quantityInStockInput
WHERE productID = :selectedProductID

UPDATE greekHouses
SET letters = :letterInput, nickname = :nicknameInput
WHERE houseID = :selectedHouseID
