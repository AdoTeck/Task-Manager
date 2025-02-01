import express from "express";
import { createProject } from "../controllers/projectController";


const router = express.Router();

router.post("/create", createProject);

export default router;