const loginValidator = (req, res, next) => {
    if(!req.isAuthenticated()) return res.status(401).json({msg: 'Unauthorized'});
    next();
};

export default loginValidator;