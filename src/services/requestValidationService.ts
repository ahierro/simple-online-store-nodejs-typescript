import {validateSync} from 'class-validator';
import {ApiError} from "../exceptions/ApiError";

export const validateObj = (obj: any): void => {
    const errors = validateSync(obj, {skipMissingProperties: false});
    if (errors.length > 0) {
        throw new ApiError({
            status: 400,
            message: errors.map(e => Object.values(e.constraints).join(",")).join("; ")
        });
    }
}
