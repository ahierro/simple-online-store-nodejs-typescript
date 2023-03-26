import config from "../../config/config";
import cartMongoDAO from "./cartMongoDAO";
import productMongoDAO from "./productMongoDAO";
import chatMessageMongoDAO from "./chatMessageMongoDAO";

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

export const chatMessageDAO= ()=> {
    switch (config.FACTORY) {
        case 'MONGO':
            return chatMessageMongoDAO;
        default:
            return null;
    }
};