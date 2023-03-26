import express from "express";
import asyncHandler from "express-async-handler";
import { login, signup} from "../controllers/sessionController";

const router = express.Router();

router.post('/login', asyncHandler(login));
router.post('/signup', asyncHandler(signup));

export default router