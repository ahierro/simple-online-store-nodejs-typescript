import {UserModel} from "../persistence/model/mongo/UserModel";
import jwt from 'jsonwebtoken';
import Config from "../config/config";
import config from "../config/config";
import log4js from "log4js";

const logger = log4js.getLogger();

export const generateAuthToken = (user) => {
    const payload = {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        admin: user.admin || false
    };
    return jwt.sign(payload, Config.TOKEN_SECRET_KEY, {
        expiresIn: config.SESSION_MAX_AGE,
    });
};

// extracts a JTW token from the request header considering it is a Auth Bearer token
export const extractToken = (req) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return null;
    return authHeader && authHeader.split(' ')[1];
}

export const checkAuth = async (req, res, next, checkAdmin) => {

    const token = extractToken(req);

    if (!token) return res.status(401).json({error: 'Unauthorized'});

    try {
        const user = await getUserFromToken(token);
        if (checkAdmin && !user.admin) return res.status(403).json({error: 'Forbidden'});
        if (!user) return res.status(401).json({error: 'Unauthorized'});
        req.user = user;
        next();
    } catch (err) {
        logger.error(`Error:`,err);
        return res.status(401).json({error: 'Unauthorized'});
    }
};

export const getUserFromToken = async (token) => {
    const decode = jwt.verify(
        token,
        Config.TOKEN_SECRET_KEY
    );
    return UserModel.findById(decode.userId);
}
