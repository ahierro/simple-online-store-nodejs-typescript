import {ApiError} from "../exceptions/ApiError";

export class UtilService {
    static insertOrUpdateById(originalList: any, newObj) {
        if (!newObj?._id) {
            throw new ApiError({status: 400, message: "El objeto debe contener un id"});
        }
        if (originalList) {
            const index = originalList?.findIndex(obj => obj._id.toString() === newObj._id.toString());
            if (index < 0) {
                originalList.push(newObj);
            } else {
                originalList[index] = newObj;
            }
        }
    }

}