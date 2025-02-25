import express from "express";
const router = express.Router();
import { authenticateUser } from "../middleware/auth.middleware";
import { accessController,getNotifiastionController,updateNotifiastionController} from "../controllers/access.controller";
import { addUserController } from "../controllers/userAccess.controller";

router.post('/user-access', authenticateUser, accessController);
router.get('/notificationCheck', authenticateUser,getNotifiastionController);
router.patch('/notificationCheck', authenticateUser,updateNotifiastionController);
router.post('/add-user', authenticateUser,addUserController )

export default router;