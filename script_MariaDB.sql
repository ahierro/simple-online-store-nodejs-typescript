CREATE DATABASE productos;

USE productos;

CREATE TABLE producto(
id VARCHAR(255) PRIMARY KEY,
title VARCHAR(255),
thumbnail VARCHAR(255),
price decimal(15,2)
)

INSERT INTO producto
(id,title,thumbnail,price)
VALUES
("faab7381-85cb-4f41-b158-49a13a56953b",
 "Escuadra",
 "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
 123.45 )
;

INSERT INTO producto
(id,title,thumbnail,price)
VALUES
    ("4daeba96-e2b0-4eb0-a6c7-258fe968d298",
     "Calculadora",
     "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
     234.56)
;

INSERT INTO producto
(id,title,thumbnail,price)
VALUES
    ("952f507b-b427-48c7-9742-14d91da11bf2",
     "Globo Terráqueo",
     "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
     345.67)
;
