import {faker} from '@faker-js/faker';

class FakeProdService {
    getAll() {
        return [{
            _id: faker.database.mongodbObjectId(),
            stock: faker.datatype.number({max: 100}),
            code: faker.datatype.uuid(),
            description: faker.commerce.productDescription(),
            title: faker.commerce.productName(),
            price: faker.datatype.number({min: 10, max: 1000}),
            thumbnail: faker.image.cats(),
            timestamp: faker.date.past(),
        }, {
            _id: faker.database.mongodbObjectId(),
            stock: faker.datatype.number({max: 100}),
            code: faker.datatype.uuid(),
            description: faker.commerce.productDescription(),
            title: faker.commerce.productName(),
            price: faker.datatype.number({min: 10, max: 1000}),
            thumbnail: faker.image.cats(),
            timestamp: faker.date.past(),
        }, {
            _id: faker.database.mongodbObjectId(),
            stock: faker.datatype.number({max: 100}),
            code: faker.datatype.uuid(),
            description: faker.commerce.productDescription(),
            title: faker.commerce.productName(),
            price: faker.datatype.number({min: 10, max: 1000}),
            thumbnail: faker.image.cats(),
            timestamp: faker.date.past(),
        }, {
            _id: faker.database.mongodbObjectId(),
            stock: faker.datatype.number({max: 100}),
            code: faker.datatype.uuid(),
            description: faker.commerce.productDescription(),
            title: faker.commerce.productName(),
            price: faker.datatype.number({min: 10, max: 1000}),
            thumbnail: faker.image.cats(),
            timestamp: faker.date.past(),
        }, {
            _id: faker.database.mongodbObjectId(),
            stock: faker.datatype.number({max: 100}),
            code: faker.datatype.uuid(),
            description: faker.commerce.productDescription(),
            title: faker.commerce.productName(),
            price: faker.datatype.number({min: 10, max: 1000}),
            thumbnail: faker.image.cats(),
            timestamp: faker.date.past(),
        }];
    }
}

export default new FakeProdService();