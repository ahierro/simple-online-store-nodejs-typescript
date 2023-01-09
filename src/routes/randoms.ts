import express from "express";
import { fork } from 'child_process';
import path from 'path';
const scriptPath = path.resolve(__dirname, './utils/calculo');

const router = express.Router();

router.get('', (req, res) => {
    const cant = +req.query.cant || 100_000_000;
    const computo = fork(scriptPath);
    computo.send(cant);
    computo.on('message', (sum) => {
        res.json(sum);
    });
});


export default router