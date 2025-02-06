import express from "express";
import { signup, login, logout, getUserProfile, updateUserProfile } from "../controllers/authController";
import { authenticateUser } from "../middleware/authMiddleware";
const router = express.Router();

router.post("/signup", signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', authenticateUser, getUserProfile);
router.patch('/profile', authenticateUser, updateUserProfile);

export default router;
