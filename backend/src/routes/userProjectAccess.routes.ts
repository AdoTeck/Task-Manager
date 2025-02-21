import express from "express";
const router = express.Router();
import { authenticateUser } from "../middleware/auth.middleware";
import { accessController,getNotifiastionData } from "../controllers/access.controller";


router.post('/user-access', authenticateUser, accessController);
router.get('/notificationCheck', authenticateUser,getNotifiastionData);
router.post('/notificationCheck', authenticateUser, )

export default router;