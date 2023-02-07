import {validateObj} from "../services/requestValidationService";
import {sendMail} from "../services/emailService";
import {plainToClassFromExist} from 'class-transformer';
import passport from 'passport';
import {SignUpDTO} from "../dto/SignUpDTO";

export const passportOptions = {badRequestMessage: 'falta username / password'};

export const login = (req, res) => {
    // @ts-ignore
    res.json({msg: `Welcome! ${req.user.username}`});
}

export const authenticate = () => passport.authenticate('login', passportOptions);

export const logout = (req, res) => {
    req.session?.destroy((err) => {
        if (!err) res.send('Hasta luego');
        else res.send({status: 'Logout ERROR', body: err});
    });
}

export const signup = async (req, res, next) => {
    const signUpDTO = plainToClassFromExist(new SignUpDTO(),req.body);
    validateObj(signUpDTO);
    passport.authenticate('signup', passportOptions, async (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (!user) return res.status(401).json(info);
        try {
            await sendMail('nuevo registro',
                `Se registró el usuario ${signUpDTO.username}
             con el email ${signUpDTO.email} 
             con telefono ${signUpDTO.phone} 
             de edad ${signUpDTO.age} `);
        } catch (e) {
            return res.status(500).json({message: "Error al enviar el mail"});
        }

        res.json({msg: 'signup OK'})
    })(req, res, next);
}