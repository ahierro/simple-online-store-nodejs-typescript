# API RESTful desafio coderhouse

# Postman para pruebas

./Backend-Coderhouse-Hierro.postman_collection.json

# Sign up

curl --location --request POST 'http://localhost:8080/api/session/signup' \
--header 'Content-Type: application/json' \
--data-raw '{		
"username": "testUserAlejandro",
"password": "pass2pass2",
"email": "taurean.gislason@ethereal.email",
"name": "Asia Veum",
"address": "Av San Martín 1470 - Ushuaia",
"age":54,
"phone":"+5491161818711",
"avatar":"https://picsum.photos/200"
}'

# Login
curl --location --request POST 'http://localhost:8080/api/session/login' \
--header 'Content-Type: application/json' \
--data-raw '{		
"username": "testUserAlejandro",
"password": "pass2pass2"
}'

# Comprar (envia sms, whatsapp y mail) 
curl --location --request POST 'http://localhost:8080/api/carrito/checkout/6383672663abaaa4bc4cf376'

# Logout
curl --location --request POST 'http://localhost:8080/api/session/logout' \
--header 'Content-Type: application/json' \
--data-raw '{		
"username": "user1",
"password": "pass1"
}'

# Get Products
curl --location --request GET 'http://localhost:8080/api/productos'

# Get Product by ID
curl --location --request GET 'http://localhost:8080/api/productos/63836631d072110f1d49641c'

# Insert Product
curl --location --request POST 'http://localhost:8080/api/productos' \
--header 'Content-Type: application/json' \
--data-raw '{		
"stock": 11,
"code": "4015468101081",
"description": "Cerveza Tirada 1L" ,
"title": "Cerveza",
"price": 100,
"thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
}'

# Modify Product
curl --location --request PUT 'http://localhost:8080/api/productos/63836631d072110f1d496417' \
--header 'Content-Type: application/json' \
--data-raw '{
"stock": 23,
"code": "5413992501045",
"timestamp": "2022-11-06T14:40:01.553Z",
"description": "Escuadra Made in Argentina 20cm",
"title": "Escuadra",
"price": 822,
"thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
}'

# Delete Product
curl --location --request DELETE 'http://localhost:8080/api/productos/63836631d072110f1d49641f'

# Insert Cart
curl --location --request POST 'http://localhost:8080/api/carrito' \
--header 'Content-Type: application/json' \
--data-raw '{

    "products": []

}'

# Delete Cart
curl --location --request DELETE 'http://localhost:8080/api/carrito/6383678e63abaaa4bc4cf383'

# Get Products in cart
curl --location --request GET 'http://localhost:8080/api/carrito/6383672663abaaa4bc4cf376/productos'

# Add Product to cart
curl --location --request POST 'http://localhost:8080/api/carrito/6383672663abaaa4bc4cf376/productos' \
--header 'Content-Type: application/json' \
--data-raw '{
"quantity": 12,
"id": "63836631d072110f1d496417"
}'

# Delete Product from cart
curl --location --request DELETE 'http://localhost:8080/api/carrito/638360e36e9d1f38a180f68b/productos/63779c49e198ad02416c6140'


# Para buildear 
npm run build

# Para correrlo en prod

npm start

# Para correrlo en desarrollo

npm run dev
