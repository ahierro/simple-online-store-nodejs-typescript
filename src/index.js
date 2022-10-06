import {Container} from "./container.js";
import express from "express";
import _ from "lodash";

const app = express();

const PORT = 8080;
const container = new Container();

app.get('/productos', async (req, res) => {
    const productos = await container.getAll();
    res.json(productos);
});

app.get('/productoRandom', async (req, res) => {
    const productos = await container.getAll();
    const randomProduct = productos[_.random(0,productos?.length-1)];
    res.json(randomProduct);
});

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', (err) => {
    console.log('Error en el servidor!! =>', err);
});

