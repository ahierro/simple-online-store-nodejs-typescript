import config from "../../config/config";
import cartMongoDAO from "./cartMongoDAO";
import productMongoDAO from "./productMongoDAO";

export const cartDAO= () => {
    switch (config.FACTORY) {
        case 'MONGO':
            return cartMongoDAO;
        default:
            return null;
    }
};

export const productDAO= ()=> {
    switch (config.FACTORY) {
        case 'MONGO':
            return productMongoDAO;
        default:
            return null;
    }
};