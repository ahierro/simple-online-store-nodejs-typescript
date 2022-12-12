import express from "express";

const router = express.Router();

const users = [
    {
        username: 'user1',
        password : 'pass1',
        admin: false,
    },
    {
        username: 'admin',
        password : 'pass2',
        admin: true,
    }
]
router.post('/login',  (req, res) => {
    const { username, password } = req.body;

    const index = users.findIndex((aUser) => aUser.username === username && aUser.password === password);

    if(index < 0)
        res.status(401).json({ msg: 'not authorized' });
    else {
        const user = users[index];
        req.session.info = {
            loggedIn: true,
            username : user.username,
            admin : user.admin,
        };
        res.json({msg: 'Bienvenido!!'})
    }
});
router.post('/logout', (req, res) => {
    req.session?.destroy((err) => {
        if (!err) res.send('Hasta luego');
        else res.send({ status: 'Logout ERROR', body: err });
    });
});
export default router