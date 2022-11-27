import {MongoContainer} from "../container/MongoContainer";
import { CartModel } from '../model/mongo/CartModel';

export default new MongoContainer("Carrito",CartModel);