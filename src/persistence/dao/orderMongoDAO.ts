import {MongoDAO} from "./mongoDAO";
import {OrderEntity} from "../model/mongo/OrderEntity";
import {OrderModel} from "../model/mongo/OrderModel";

export default new MongoDAO<OrderEntity>("Order",OrderModel);