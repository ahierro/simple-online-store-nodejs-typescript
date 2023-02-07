import {GenericDAO} from "../../container/genericDAO";
import {ProductModel} from '../model/mongo/ProductModel';

export default new GenericDAO("Producto",ProductModel);