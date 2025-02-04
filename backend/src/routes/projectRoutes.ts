import express from "express";
import { createProject } from "../controllers/projectController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", authMiddleware, createProject);

export default router;