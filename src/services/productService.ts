import {MongoContainer} from "../container/MongoContainer";
import { ProductModel } from '../model/mongo/ProductModel';

export default new MongoContainer("Producto",ProductModel);