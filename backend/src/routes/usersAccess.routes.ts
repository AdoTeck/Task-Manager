import express from "express";
const router = express.Router();
import { authenticateUser } from "../middleware/auth.middleware";
import { getUserController } from "../controllers/userAccess.controller"

router.get('/user-data', authenticateUser, getUserController);

export default router;