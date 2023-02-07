import  config from '../config/config'
import loginValidator from "./loginValidator";
const adminGuard = (req,res,next) => {
    if(!config.admin){
        return res.status(401).json({error: "Not authorized"})
    }
    loginValidator(req,res,next);
}
export default adminGuard;