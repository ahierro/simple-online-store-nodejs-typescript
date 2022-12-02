import express from "express";
import messageService from '../services/messageService';

const router = express.Router();

router.get('/normalized', async (req, res) => {
    res.json(await messageService.getAllNormalized());
});
router.get('/denormalized', async (req, res) => {
    res.json(await messageService.getAllDenormalized());
});

export default router