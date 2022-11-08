# Comandos que se ejecutaron
npm init -y

npm i nodemon -D

npm i express

npm i express-async-errors

npm i uuid

# API RESTful desafio coderhouse

## Productos 
### El router base '/api/productos' implementará cuatro funcionalidades:
### GET: '/' - Me permite listar todos los productos disponibles
- curl --location --request GET 'http://localhost:8080/api/productos'
#### Response
```json
[
    {
        "stock": 23,
        "code": "5413992501045",
        "timestamp": "2022-11-06T14:40:01.553Z",
        "description": "Escuadra Made in Argentina 20cm",
        "title": "Escuadra",
        "price": 126,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        "id": "faab7381-85cb-4f41-b158-49a13a56953b"
    },
    {
        "stock": 65,
        "code": "4015468101080",
        "timestamp": "2022-11-02T14:40:01.553Z",
        "description": "Globo Made in China",
        "title": "Globo Terráqueo",
        "price": 345.67,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        "id": "952f507b-b427-48c7-9742-14d91da11bf2"
    },
    {
        "stock": 65,
        "code": "4015468101080",
        "timestamp": "2022-11-02T14:40:01.553Z",
        "description": "Cuaderno 120 hojas tapa Verde",
        "title": "Cuaderno",
        "price": 111,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        "id": "5e09925d-7008-434c-b6a0-dc8c31e7150b"
    }
]
```
### GET: '/:id?' - Me permite listar un producto por su id (disponible para usuarios y administradores)
- curl --location --request GET 'http://localhost:8080/api/productos/faab7381-85cb-4f41-b158-49a13a56953b'
#### Response
```json
{
  "stock": 23,
  "code": "5413992501045",
  "timestamp": "2022-11-06T14:40:01.553Z",
  "description": "Escuadra Made in Argentina 20cm",
  "title": "Escuadra",
  "price": 126,
  "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
  "id": "faab7381-85cb-4f41-b158-49a13a56953b"
}
```
### POST: '/' - Para incorporar productos al listado (disponible para administradores)
- curl --location --request POST 'http://localhost:8080/api/productos' \
--header 'Content-Type: application/json' \
--data-raw '{		
"stock": 65,
"code": "4015468101080",
"description": "Cuaderno 120 hojas tapa Verde" ,
"title": "Cuaderno",
"price": 111,
"thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
}'
#### Response status 201
#### 
```json
{
    "stock": 65,
    "code": "4015468101080",
    "description": "Cuaderno 120 hojas tapa Verde",
    "title": "Cuaderno",
    "price": 111,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    "timestamp": "2022-11-07T17:46:40.941Z",
    "id": "978660e3-88ff-4f7c-9900-f6bfd24447b9"
}
```
### PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
- curl --location --request PUT 'http://localhost:8080/api/productos/faab7381-85cb-4f41-b158-49a13a56953b' \
--header 'Content-Type: application/json' \
--data-raw '{
"stock": 23,
"code": "5413992501045",
"timestamp": "2022-11-06T14:40:01.553Z",
"description": "Escuadra Made in Argentina 20cm",
"title": "Escuadra",
"price": 888,
"thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
"id": "faab7381-85cb-4f41-b158-49a13a56953b"
}'
#### Response status 200
### DELETE: '/:id' - Borra un producto por su id (disponible para administradores)
- curl --location --request DELETE 'http://localhost:8080/api/productos/952f507b-b427-48c7-9742-14d91da11bf2'
#### Response status 200

## Carritos

### POST: '/' - Crea un carrito y devuelve su id.
- curl --location --request POST 'http://localhost:8080/api/carrito' \
  --header 'Content-Type: application/json' \
  --data-raw '{

  "products": []
}'
#### Response status 201
#### Response
```json
{
    "products": [],
    "timestamp": "2022-11-07T18:07:50.185Z",
    "id": "0441547c-ce63-4cb1-9447-5cd5e4924b34"
}
```

### DELETE: '/:id' - Vacía un carrito y lo elimina.
- curl --location --request DELETE 'http://localhost:8080/api/carrito/f4f1fd2b-359d-4934-8782-adecf45acb0f'
### GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
- curl --location --request GET 'http://localhost:8080/api/carrito/55423a2e-9f4b-495f-9191-5f84d7115189/productos'
### POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
- curl --location --request POST 'http://localhost:8080/api/carrito/55423a2e-9f4b-495f-9191-5f84d7115189/productos' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "quantity": 50,
  "id": "5e09925d-7008-434c-b6a0-dc8c31e7150b"
  }'
### DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
- curl --location --request DELETE 'http://localhost:8080/api/carrito/55423a2e-9f4b-495f-9191-5f84d7115189/productos/faab7381-85cb-4f41-b158-49a13a56953b' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "quantity":40,
  "id": "faab7381-85cb-4f41-b158-49a13a56953b"
  }'
#### Response status 200



#### Response
```json
```




# Formulario carga de productos
http://localhost:8080/ --> Formulario carga de productos

# Para correrlo en prod

npm start

# Para correrlo en desarrollo

npm run dev


```json
```