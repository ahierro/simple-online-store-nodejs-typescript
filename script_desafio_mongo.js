//1) Agregar 10 documentos con valores distintos a las colecciones mensajes y productos. El formato de los documentos debe estar en correspondencia con el que venimos utilizando en el entregable con base de datos MariaDB. 
use ecommerce;

db.mensajes.insertMany([{
    "mail": "a@gmail.com",
    "content": "hola",
    "time": "2022-11-06T02:49:45.520Z"
},
    {
        "mail": "b@gmail.com",
        "content": "hola 2",
        "time": "2022-11-06T02:50:45.520Z"
    },
    {
        "mail": "c@gmail.com",
        "content": "hola 3",
        "time": "2022-11-06T02:51:45.520Z"
    },
    {
        "mail": "d@gmail.com",
        "content": "hola 4",
        "time": "2022-11-06T02:52:45.520Z"
    },
    {
        "mail": "e@gmail.com",
        "content": "hola 5",
        "time": "2022-11-06T02:53:45.520Z"
    },
    {
        "mail": "g@gmail.com",
        "content": "hola 6",
        "time": "2022-11-06T02:54:45.520Z"
    },
    {
        "mail": "g@gmail.com",
        "content": "hola 7",
        "time": "2022-11-06T02:55:45.520Z"
    },
    {
        "mail": "h@gmail.com",
        "content": "hola 8",
        "time": "2022-11-06T02:56:45.520Z"
    },
    {
        "mail": "i@gmail.com",
        "content": "hola 9",
        "time": "2022-11-06T02:57:45.520Z"
    },
    {
        "mail": "j@gmail.com",
        "content": "hola 10",
        "time": "2022-11-06T02:58:45.520Z"
    }
]);
//2) Definir las claves de los documentos en relación a los campos de las tablas de esa base. En el caso de los productos, poner valores al campo precio entre los 100 y 5000 pesos(eligiendo valores intermedios, ej: 120, 580, 900, 1280, 1700, 2300, 2860, 3350, 4320, 4990).
db.productos.insertMany([{
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
    }])
//3) Listar todos los documentos en cada colección.
db.productos.find({})
//4) Mostrar la cantidad de documentos almacenados en cada una de ellas.
db.mensajes.countDocuments({})
db.productos.countDocuments({})
//5) Realizar un CRUD sobre la colección de productos:
//5 a) Agregar un producto más en la colección de productos
db.productos.insertOne({
    "code": "5413992501045",
    "timestamp": "2022-11-06T14:40:01.553Z",
    "description": "Moto G200",
    "title": "Celular",
    "price": 120,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
})
//5 b) Realizar una consulta por nombre de producto específico:
db.productos.find({"title":"Teclado"})
//5 b i) Listar los productos con precio menor a 1000 pesos.
db.productos.find({"price": {"$lt": 1000}})
//5 b ii) Listar los productos con precio entre los 1000 a 3000 pesos.
db.productos.find({"price": {"$gte": 1000,"$lte": 3000}})
//5 b iii)Listar los productos con precio mayor a 3000 pesos.
db.productos.find({"price": {"$gt": 3000}})
//5 b iv)Realizar una consulta que traiga sólo el nombre del tercer producto más barato.
db.productos.find({},{ "title": 1,"_id":0}).skip(2).limit(1).sort({"price":1})
//5 c) Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.
db.productos.updateMany({},{ $set: { stock: 100 } })
//5 d) Cambiar el stock a cero de los productos con precios mayores a 4000 pesos.
db.productos.updateMany({"price": {"$gt": 4000}},{ $set: { stock: 0 } })
//5 e) Borrar los productos con precio menor a 1000 pesos
db.productos.deleteMany({"price": {"$lt": 1000}})
//6) Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce. Verificar que pepe no pueda cambiar la información.
db.createUser(
    {
        user: "pepe",
        pwd: "asd456",
        roles: [
            { role: "read", db: "ecommerce" }
        ]
    }
)
