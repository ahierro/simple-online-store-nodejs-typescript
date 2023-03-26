import supertest from 'supertest';
import server from '../services/server';
import {connectDb} from "../persistence/db";
import chai from "chai";
import {before, describe, it} from "mocha";

const {expect} = chai;

describe('Test E2E Supertests de product', () => {
    let request: supertest.SuperTest<supertest.Test>;
    let headers = {
        authorization: null
    }
    before(async () => {
        await connectDb();
        request = supertest(server);

        const response = await request.post(`/api/session/login`)
            .send({
                "username": "testAdmin",
                "password": "adminadmin"
            });
        const token = response.body.token;
        headers.authorization = "Bearer " + token;
        expect(response.status).to.equal(200);
    });

    it('[GET] product by id', async () => {
        const response = await request.get(`/api/product/641f51e12057fdadc42b8693`).set(headers);
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal({
            "id": "641f51e12057fdadc42b8693",
            "stock": 2122,
            "code": "4043218101081",
            "category": "Accesories",
            "description": "Keyboard",
            "title": "Keyboard",
            "price": 100,
            "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
            "timestamp": "2023-03-25T19:56:17.540Z"
        });
    });

    it('[GET] all products', async () => {
        const response = await request.get(`/api/product`).set(headers);
        expect(response.status).to.equal(200);
    });

    it('[POST] product', async () => {
        const response = await request.post(`/api/product`).set(headers)
            .send({
                "stock": 2122,
                "code": "4043218101081",
                "category": "Accesories",
                "description": "Keyboard",
                "title": "Keyboard",
                "price": 100,
                "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
                "timestamp": "2023-03-25T19:56:17.540Z"
            });
        expect(response.status).to.equal(201);
    });

    it('[PUT] product', async () => {
        const response = await request.put(`/api/product/641f51e12057fdadc42b8693`).set(headers)
            .send({
                "stock": 2122,
                "code": "4043218101081",
                "category": "Accesories",
                "description": "Keyboard",
                "title": "Keyboard",
                "price": 100,
                "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
            });
        expect(response.status).to.equal(200);
    });

    it('[DELETE] create and delete product', async () => {
        const responseCreate = await request.post(`/api/product`).set(headers)
            .send({
                "stock": 2121,
                "code": "4043218101081",
                "category": "Test",
                "description": "Teclado Gamer",
                "title": "Teclado",
                "price": 100,
                "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
            });

        expect(responseCreate.status).to.equal(201);

        const responseDelete = await request.delete(`/api/product/${responseCreate.body.id}`).set(headers);
        expect(responseDelete.status).to.equal(200);

    });

    it('[DELETE] non-existing product', async () => {
        try {
            await request.delete(`/api/product/63e7b9a44b20e75595326ab0`).set(headers)
        } catch (e) {
            expect(e.response.status).to.equal(404);
            expect(e.response.data).to.equal({
                "error": "Product not found"
            });
        }
    });

    it('[PUT] non-existing product', async () => {
        try {
            await request.put(`/api/product/13e12b10117ca1dc12011586`).set(headers)
                .send({
                    "stock": 23,
                    "code": "5413992501045",
                    "category": "Test",
                    "timestamp": "2022-11-06T14:40:01.553Z",
                    "description": "Monitor 277771'LG",
                    "title": "Escuadra",
                    "price": 822,
                    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
                });
        } catch (e) {
            expect(e.response.status).to.equal(404);
            expect(e.response.data).to.equal({
                "error": "Product not found"
            });
        }
    });

    it('[GET] non-existing product', async () => {
        try {
            await request.get(`/api/product/13e12b10117ca1dc12011586`).set(headers);
        } catch (e) {
            expect(e.response.status).to.equal(404);
            expect(e.response.data).to.equal({
                "error": "Product not found"
            });
        }
    });
});
