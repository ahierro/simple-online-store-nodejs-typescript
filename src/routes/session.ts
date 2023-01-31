import express from "express";
import passport from 'passport';
import {SignUpDTO} from "../model/SignUpDTO";
import {validateObj} from "../services/requestValidationService";
import {sendMail} from "../services/email.service";
import asyncHandler from "express-async-handler";
import {errorHandler} from "../services/errorHandler";

const router = express.Router();
const passportOptions = {badRequestMessage: 'falta username / password'};

const castSignUp = (obj) => {
    const request = new SignUpDTO();
    Object.assign(request, obj);
    return request;
}

router.post('/login', passport.authenticate('login', passportOptions), (req, res) => {
    // @ts-ignore
    res.json({msg: 'Welcome!', user: req.user});
});

router.post('/logout', (req, res) => {
    req.session?.destroy((err) => {
        if (!err) res.send('Hasta luego');
        else res.send({status: 'Logout ERROR', body: err});
    });
});

router.post('/signup', asyncHandler(async (req, res, next) => {
    const signUpDTO = castSignUp(req.body);
    validateObj(signUpDTO);
    passport.authenticate('signup', passportOptions, async (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (!user) return res.status(401).json(info);
        try{
            await sendMail('nuevo registro',
                `Se registró el usuario ${signUpDTO.username}
             con el email ${signUpDTO.email} 
             con telefono ${signUpDTO.phone} 
             de edad ${signUpDTO.age} `);
        }catch (e) {
            return res.status(500).json({message:"Error al enviar el mail"});
        }

        res.json({msg: 'signup OK'})
    })(req, res, next);
}));

export default router