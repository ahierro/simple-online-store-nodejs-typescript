import express from "express";
import passport from 'passport';

const router = express.Router();
const passportOptions = { badRequestMessage: 'falta username / password' };

router.post('/login', passport.authenticate('login', passportOptions),  (req, res) => {
    // @ts-ignore
    res.json({ msg: 'Welcome!', user: req.user });
});

router.post('/logout', (req, res) => {
    req.session?.destroy((err) => {
        if (!err) res.send('Hasta luego');
        else res.send({ status: 'Logout ERROR', body: err });
    });
});

router.post('/signup',  (req, res, next) => {
    passport.authenticate('signup', passportOptions, (err, user, info) => {
        if(err) {
            return next(err)
        }
        if(!user) return res.status(401).json(info);
        res.json({msg: 'signup OK'})
    })(req, res, next);
});

export default router