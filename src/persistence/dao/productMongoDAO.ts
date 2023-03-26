import {MongoDAO} from "./mongoDAO";
import {ProductModel} from '../model/mongo/ProductModel';
import {ProductEntity} from "../model/mongo/ProductEntity";

export default new MongoDAO<ProductEntity>("Product",ProductModel);