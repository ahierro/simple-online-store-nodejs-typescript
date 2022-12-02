import express from "express";
import productFakeService from '../services/productFakeService';

const router = express.Router();

router.get('/', (req, res) => {
    res.json(productFakeService.getAll());
});


export default router