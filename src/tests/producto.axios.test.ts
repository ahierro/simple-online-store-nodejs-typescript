import axios from "axios";

let config = {}
const baseURL = 'http://localhost:8080';

describe('Product E2E Axios Tests', () => {

    beforeAll(async () => {
        const response = await axios.post(`${baseURL}/api/session/login`, {
            "username": "testUserAlejandro51k",
            "password": "pass2pass2"
        });
        const cookieHeaders = response.headers['set-cookie'];
        const cookie = cookieHeaders[0].split(';')[0];
        config = {
            headers: {
                Cookie: cookie
            }
        }
        expect(response.status).toBe(200);
    });

    it('[GET] product by id', async () => {
        const response = await axios.get(`${baseURL}/api/productos/63e7e5cf93ca1dee30977f24`, config);
        expect(response.status).toBe(200);
        expect(response.data).toEqual({
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
        const response = await axios.get(`${baseURL}/api/productos`, config);
        expect(response.status).toBe(200);
    });

    it('[POST] product', async () => {
        const response = await axios.post(`${baseURL}/api/productos`, {
            "stock": 2121,
            "code": "4043218101081",
            "description": "Teclado Gamer",
            "title": "Teclado",
            "price": 100,
            "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
        }, config);
        expect(response.status).toBe(201);
    });

    it('[PUT] product', async () => {
        const response = await axios.put(`${baseURL}/api/productos/63e19b10917ca7dc12011586`, {
            "stock": 23,
            "code": "5413992501045",
            "timestamp": "2022-11-06T14:40:01.553Z",
            "description": "Monitor 277771'LG",
            "title": "Escuadra",
            "price": 822,
            "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
        }, config);
        expect(response.status).toBe(200);
    });

    it('[DELETE] create and delete product', async () => {
        const responseCreate = await axios.post(`${baseURL}/api/productos`, {
            "stock": 2121,
            "code": "4043218101081",
            "description": "Teclado Gamer",
            "title": "Teclado",
            "price": 100,
            "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
        }, config);

        expect(responseCreate.status).toBe(201);

        const responseDelete = await axios.delete(`${baseURL}/api/productos/${responseCreate.data.id}`, config);
        expect(responseDelete.status).toBe(200);

    });

    it('[DELETE] non-existing product', async () => {
        try {
            await axios.delete(`${baseURL}/api/productos/63e7b9a44b20e75595326ab0`, config)
        } catch (e) {
            expect(e.response.status).toBe(404);
            expect(e.response.data).toEqual({
                "error": "Producto no encontrado"
            });
        }
    });

    it('[PUT] non-existing product', async () => {
        try {
            await axios.put(`${baseURL}/api/productos/13e12b10117ca1dc12011586`, {
                "stock": 23,
                "code": "5413992501045",
                "timestamp": "2022-11-06T14:40:01.553Z",
                "description": "Monitor 277771'LG",
                "title": "Escuadra",
                "price": 822,
                "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
            }, config);
        } catch (e) {
            expect(e.response.status).toBe(404);
            expect(e.response.data).toEqual({
                "error": "Producto no encontrado"
            });
        }
    });

    it('[GET] non-existing product', async () => {
        try {
            await axios.get(`${baseURL}/api/productos/13e12b10117ca1dc12011586`, config);
        } catch (e) {
            expect(e.response.status).toBe(404);
            expect(e.response.data).toEqual({
                "error": "Producto no encontrado"
            });
        }
    });
});
