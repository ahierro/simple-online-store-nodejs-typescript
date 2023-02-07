import express from "express";
import adminGuard from "../middlewares/adminGuard";
import asyncHandler from "express-async-handler";
import loginValidator from "../middlewares/loginValidator";
import {create, deleteById, getAll, getById, update} from "../controllers/productController";

const router = express.Router();

router.get('/', loginValidator, asyncHandler(getAll));
router.get('/:id', loginValidator, asyncHandler(getById));
router.post('/', adminGuard, asyncHandler(create));
router.put('/:id', adminGuard, asyncHandler(update));
router.delete('/:id', adminGuard, asyncHandler(deleteById));

export default router