const loginValidator = (req, res, next) => {
    if (req.session?.info?.loggedIn) next();
    else res.status(401).json({ msg: 'unauthorized' });
};

export default loginValidator;