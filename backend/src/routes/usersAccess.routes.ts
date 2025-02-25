import express from "express";
const router = express.Router();
import { authenticateUser } from "../middleware/auth.middleware";
import  { getUserController } from "../controllers/userAccess.controller"

router.get('/user-access', authenticateUser,getUserController);

export default router;