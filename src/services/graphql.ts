import { buildSchema } from 'graphql';
import {readFileSync} from "fs";
import {
    getProducts,
    getProductById,
    insertProduct,
    updateProductById,
    deleteProductById
} from "../graphql/controllers/productController";

const typeDefs = readFileSync('./src/graphql/schema.graphql', 'utf8');

// GraphQL schema
export const graphqlSchema = buildSchema(typeDefs);

// Root resolver
export const graphqlRoot = {
    getProducts,
    getProductById,
    insertProduct,
    updateProductById,
    deleteProductById
};
