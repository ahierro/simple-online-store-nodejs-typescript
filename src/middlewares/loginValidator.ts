import {checkAuth} from "../services/authService";

const loginValidator = (req, res, next) => {
    return checkAuth(req, res, next, false);
};

export default loginValidator;