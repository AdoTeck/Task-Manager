import express from "express";
const router = express.Router();
import { authenticateUser } from "../middleware/auth.middleware";


router.post('/user-access/:refCode',authenticateUser);

export default router;