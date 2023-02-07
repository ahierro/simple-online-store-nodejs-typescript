import express from "express";
import asyncHandler from "express-async-handler";
import {authenticate, login, logout, signup} from "../controllers/sessionController";

const router = express.Router();

router.post('/login', authenticate(), login);
router.post('/logout', logout);
router.post('/signup', asyncHandler(signup));

export default router