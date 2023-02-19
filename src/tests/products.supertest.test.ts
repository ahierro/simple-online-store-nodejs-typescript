import supertest from 'supertest';
import * as http from 'http';
import app from '../services/server';
import {connectDb} from "../persistence/db";
import chai from "chai";
import {before, describe, it} from "mocha";

const {expect} = chai;

describe('Test E2E Supertests de Productos', () => {
    const Server = http.createServer(app);
    let request: supertest.SuperTest<supertest.Test>;
    let headers = {
        Cookie: null
    }
    before(async () => {
        await connectDb();
        request = supertest(Server);

        const response = await request.post(`/api/session/login`)
            .send({
                "username": "testUserAlejandro51k",
                "password": "pass2pass2"
            });
        const cookieHeaders = response.headers['set-cookie'];
        headers.Cookie = cookieHeaders[0].split(';')[0];
        expect(response.status).to.equal(200);
    });

    it('[GET] product by id', async () => {
        const response = await request.get(`/api/productos/63e7e5cf93ca1dee30977f24`).set(headers);
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal({
            "id": "63e7e5cf93ca1dee30977f24",
            "stock": 111,
            "code": "4043218101081",
            "description": "Silla Gamer 2",
            "title": "Silla",
            "price": 100,
            "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
            "timestamp": "2023-02-11T19:00:31.359Z"
        });
    });

    it('[GET] all products', async () => {
        const response = await request.get(`/api/productos`).set(headers);
        expect(response.status).to.equal(200);
    });

    it('[POST] product', async () => {
        const response = await request.post(`/api/productos`).set(headers)
            .send({
                "stock": 2121,
                "code": "4043218101081",
                "description": "Teclado Gamer",
                "title": "Teclado",
                "price": 100,
                "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
            });
        expect(response.status).to.equal(201);
    });

    it('[PUT] product', async () => {
        const response = await request.put(`/api/productos/63e19b10917ca7dc12011586`).set(headers)
            .send({
                "stock": 23,
                "code": "5413992501045",
                "timestamp": "2022-11-06T14:40:01.553Z",
                "description": "Monitor 277771'LG",
                "title": "Escuadra",
                "price": 822,
                "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
            });
        expect(response.status).to.equal(200);
    });

    it('[DELETE] create and delete product', async () => {
        const responseCreate = await request.post(`/api/productos`).set(headers)
            .send({
                "stock": 2121,
                "code": "4043218101081",
                "description": "Teclado Gamer",
                "title": "Teclado",
                "price": 100,
                "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
            });

        expect(responseCreate.status).to.equal(201);

        const responseDelete = await request.delete(`/api/productos/${responseCreate.body.id}`).set(headers);
        expect(responseDelete.status).to.equal(200);

    });

    it('[DELETE] non-existing product', async () => {
        try {
            await request.delete(`/api/productos/63e7b9a44b20e75595326ab0`).set(headers)
        } catch (e) {
            expect(e.response.status).to.equal(404);
            expect(e.response.data).to.equal({
                "error": "Producto no encontrado"
            });
        }
    });

    it('[PUT] non-existing product', async () => {
        try {
            await request.put(`/api/productos/13e12b10117ca1dc12011586`).set(headers)
                .send({
                    "stock": 23,
                    "code": "5413992501045",
                    "timestamp": "2022-11-06T14:40:01.553Z",
                    "description": "Monitor 277771'LG",
                    "title": "Escuadra",
                    "price": 822,
                    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
                });
        } catch (e) {
            expect(e.response.status).to.equal(404);
            expect(e.response.data).to.equal({
                "error": "Producto no encontrado"
            });
        }
    });

    it('[GET] non-existing product', async () => {
        try {
            await request.get(`/api/productos/13e12b10117ca1dc12011586`).set(headers);
        } catch (e) {
            expect(e.response.status).to.equal(404);
            expect(e.response.data).to.equal({
                "error": "Producto no encontrado"
            });
        }
    });
});
