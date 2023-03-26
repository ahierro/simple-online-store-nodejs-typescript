import {MongoDAO} from "./mongoDAO";
import {CartModel} from '../model/mongo/CartModel';
import {CartEntity} from "../model/mongo/CartEntity";

export default new MongoDAO<CartEntity>("Cart",CartModel);