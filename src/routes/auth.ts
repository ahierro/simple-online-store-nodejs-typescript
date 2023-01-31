import {UserModel} from "../model/mongo/UserModel";
import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import log4js from "log4js";
const logger = log4js.getLogger();
const strategyOptions = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
};

const signup = async (req, username, password, done) => {
    logger.info('SIGNUP!',req?.body);
    try {
        const newUser = new UserModel({...req.body,username, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        return done(null, newUser);
    } catch (error) {
        if(error.code === 11000){
            return done(null, false, { message: 'El usuario ya existe' });
        }
        logger.error(error);
        return done(null, false, { message: 'Error inesperado' });
    }
};

const login = async (req, username, password, done) => {
    logger.info('BUSCANDO USUARIO...')
    const user = await UserModel.findOne({username});
    if (!user) {
        return done(null, false, { message: 'User not found' });
    } else {
        const match = await user.matchPassword(password);
        match ? done(null, user) : done(null, false);
    }
    logger.info('USUARIO ENCONTRADO!');
};

passport.serializeUser((user, done)=>{
    logger.info('SERIALIZANDO USUARIO...');
    done(null, user._id);
});

passport.deserializeUser( async(userId, done)=>{
    logger.info('DESERIALIZANDO USUARIO...');
    const user = await UserModel.findById(userId);
    return done(null, user);
});

export const loginFunc = new LocalStrategy(strategyOptions, login);
export const signUpFunc = new LocalStrategy(strategyOptions, signup);