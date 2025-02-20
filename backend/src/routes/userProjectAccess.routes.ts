import express from "express";
const router = express.Router();
import { authenticateUser } from "../middleware/auth.middleware";
import { accessController } from "../controllers/access.controller";


router.post('/user-access/', authenticateUser, accessController);

export default router;