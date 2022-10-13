# Comandos que se ejecutaron
npm init -y

npm i nodemon -D

npm i express

npm i express-async-errors

npm i uuid

# API RESTful desafio coderhouse

### GET 'http://localhost:8080/api/productos' -> devuelve todos los productos.

### GET 'http://localhost:8080/api/productos/:id' -> devuelve un producto según su id.

### POST 'http://localhost:8080/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
#### body:
```json
{
"title": "Cuaderno",
"price": 111,
"thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
}
```
### PUT 'http://localhost:8080/api/productos/:id' -> recibe y actualiza un producto según su id.
#### body:

```json
{
"title": "Cuaderno",
"price": 111,
"thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
}
```

### DELETE 'http://localhost:8080/api/productos/:id' -> elimina un producto según su id.

# Formulario carga de productos
http://localhost:8080/ --> Formulario carga de productos

# Para correrlo en prod

npm start

# Para correrlo en desarrollo

npm run dev