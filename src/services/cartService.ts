import {GenericService} from "./genericService";
import cartDAO from "../persistence/dao/cartDAO";

export const cartService = new GenericService(cartDAO);