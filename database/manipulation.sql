-- Insertion queries --
INSERT INTO customers(houseID, firstName, lastName, email)
VALUES (:houseIDValue, :firstNameValue, :lastNameValue, :emailValue);

INSERT INTO orders(customerID, shipStreet, shipCity, shipState, shipZip)
VALUES (:customerIDValue, :shipStreetValue, :shipCityValue, :shipStateValue, :shipZipValue);

INSERT INTO products(category, price, name, quantityInStock)
VALUES (:categoryValue, :priceValue, :nameValue, :quantityInStockValue);

INSERT INTO greekHouses(letters, nickname)
VALUES (:lettersValue, :nicknameValue);

INSERT INTO products_greekHouses(houseID, productID)
VALUES (:houseIDValue, :productIDValue);

INSERT INTO products_orders(orderID, productID, productQty)
VALUES (:orderIDValue, :productIDValue, :productQtyValue);

-- Searching queries --
SELECT customerID, houseID, firstName, lastName, email
FROM customers
WHERE customerID = :selectedCustomerID;

SELECT orderID, customerID, shipStreet, shipCity, shipState, shipZip
FROM orders
WHERE orderID = :selectedOrderID;

SELECT productID, category, price, name, quantityInStock
FROM products
WHERE productID = :selectedProductID;

SELECT houseID, letters, nickname
FROM greekHouses
WHERE houseID = :selectedHouseID;

SELECT productID, houseID 
FROM products_greekHouses
WHERE productID=:selectedProductID AND houseID=:selectedHouseID;

SELECT orderID, productID, productQty 
FROM products_orders
WHERE orderID=:selectedOrderID AND productID=:selectedProductID;

-- Delete Queries --
DELETE FROM customers
WHERE customerID = :selectedCustomerID;

DELETE FROM orders
WHERE orderID = :selectedOrderID;

DELETE FROM products
WHERE productID = :selectedProductID;

DELETE FROM greekHouses
WHERE houseID = :selectedHouseID;

DELETE FROM products_greekHouses 
WHERE productID=:selectedProductID AND houseID=:selectedHouseID;

DELETE FROM products_orders 
WHERE orderID=:selectedOrderID AND productID=:selectedProductID;

-- Update Queries --
UPDATE customers
SET firstName = :firstNameInput, lastName = :lastNameInput, email = :emailInput
WHERE customerID = :selectedCustomerID;

UPDATE orders
SET customerID = :customerIDInput, shipStreet = :shipStreetInput, shipCity = :shipCityInput, shipState = :shipStateInput, shipZip = :shipZipInput
WHERE orderID = :selectedOrderID;

UPDATE products
SET category = :categoryInput, price = :priceInput, name = :nameInput, quantityInStock = :quantityInStockInput
WHERE productID = :selectedProductID;

UPDATE greekHouses
SET letters = :letterInput, nickname = :nicknameInput
WHERE houseID = :selectedHouseID;

UPDATE products_greekHouses 
SET productID=:productIDInput, houseID=:HouseIDInput 
WHERE productID=:selectedProductID AND houseID=:selectedHouseID;

UPDATE products_orders 
SET orderID=:orderIDInput, productID=:productIDInput, productQty=:productQtyInput 
WHERE orderID=:selectedOrderID AND productID=:selectedProductID;