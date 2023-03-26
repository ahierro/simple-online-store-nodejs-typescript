import {checkAuth} from "../services/authService";

const adminGuard = (req, res, next) => {
    return checkAuth(req, res, next, true);
}
export default adminGuard;