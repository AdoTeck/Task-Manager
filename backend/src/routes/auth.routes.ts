import express from "express";
import { signup, login, logout, getUserProfile, updateUserProfile, googleAuth } from "../controllers/auth.controller";
import { authenticateUser } from "../middleware/auth.middleware";
import { verifyGoogleToken } from "../middleware/google-auth.middleware";
const router = express.Router();

router.post("/signup", signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', authenticateUser, getUserProfile);
router.patch('/profile', authenticateUser, updateUserProfile);
router.post('/google', verifyGoogleToken, googleAuth);

export default router;
