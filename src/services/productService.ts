import {GenericService} from "./genericService";
import productDAO from "../persistence/dao/productDAO";

export const productService = new GenericService(productDAO);