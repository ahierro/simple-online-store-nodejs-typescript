db.createUser(
    {
        user: "crud-admin",
        pwd: "superPass123",
        roles: [
            { role: "readWrite", db: "ecommerce" }
        ]
    }
);
db.products.insertMany([{
    "code": "5413992501045",
    "timestamp": "2022-11-06T14:40:01.553Z",
    "description": "Escuadra Made in Argentina 20cm",
    "title": "Escuadra",
    "price": 120,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
},
    {
        "code": "4015468101080",
        "timestamp": "2022-11-02T14:40:01.553Z",
        "description": "Cuaderno 120 hojas tapa Verde",
        "title": "Cuaderno",
        "price": 580,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    },
    {
        "code": "4015468101080",
        "description": "Guitarra Azul",
        "title": "Guitarra",
        "price": 900,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        "timestamp": "2022-11-09T16:41:35.913Z",
    },
    {
        "code": "4015468101080",
        "description": "Botella de 1 litro",
        "title": "Botella",
        "price": 1280,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        "timestamp": "2022-11-09T20:29:27.053Z"
    },
    {
        "code": "5413992501045",
        "timestamp": "2022-11-06T14:40:01.553Z",
        "description": "Lampara blanca",
        "title": "Lampara",
        "price": 1700,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    },
    {
        "code": "4015468101080",
        "timestamp": "2022-11-02T14:40:01.553Z",
        "description": "Monitor 30 pulgadas",
        "title": "Monitor",
        "price": 2300,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    },
    {
        "code": "4015468101080",
        "description": "Dell latitude 7400",
        "title": "Laptop",
        "price": 3350,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        "timestamp": "2022-11-09T16:41:35.913Z",
    },
    {
        "code": "4015468101080",
        "description": "Teclado Mecanico switchs red",
        "title": "Teclado",
        "price": 4320,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        "timestamp": "2022-11-09T20:29:27.053Z"
    },
    {
        "code": "4015468101080",
        "description": "Mouse Gamer 300dpi",
        "title": "Mouse",
        "price": 111,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        "timestamp": "2022-11-09T16:41:35.913Z",
    },
    {
        "code": "4015468101080",
        "description": "Motherboard Asus b450",
        "title": "Motherboard",
        "price": 4990,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        "timestamp": "2022-11-09T20:29:27.053Z"
    }]);