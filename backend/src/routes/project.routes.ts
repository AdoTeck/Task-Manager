import express from "express";
import { createProject, getProject } from "../controllers/project.controller";

import { authenticateUser } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/create", authenticateUser, createProject);
router.get("/getProjects", authenticateUser, getProject);

export default router;