import {GenericDAO} from "../../container/genericDAO";
import {CartModel} from '../model/mongo/CartModel';

export default new GenericDAO("Carrito",CartModel);