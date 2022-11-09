import  config from '../config/config'
const adminGuard = (req,res,next) => {
    if(!config.admin){
        return res.status(401).json({error: "Not authorized"})
    }
    next();
}
export default adminGuard;