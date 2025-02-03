import express from "express";
import { createProject, getProject } from "../controllers/projectController";

import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", authenticateUser, createProject);
router.get("/getProjects", authenticateUser, getProject);

export default router;