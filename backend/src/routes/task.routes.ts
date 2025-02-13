import express from "express";
import {
  createTaskController,
  getTaskController,
  updateTaskController,
  deleteTaskController,
} from "../controllers/task.controller";
import { validateProjectTask } from "../middleware/taskaccess.middleware";

const router = express.Router();

router.post("/createtask/:projectID", validateProjectTask, createTaskController);
router.get("/gettask/:projectID", validateProjectTask, getTaskController);
router.put("/updatetask/:projectID/:taskId", validateProjectTask, updateTaskController);
router.delete("/deletetask/:projectID/:taskId", validateProjectTask, deleteTaskController);

export default router;
