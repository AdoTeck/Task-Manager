import express from "express";
import {
  createTaskController,
  getTaskController,
  updateTaskController,
  deleteTaskController,
} from "../controllers/task.controller";
import { validateProjectTask } from "../middleware/taskaccess.middleware";

const router = express.Router();

router.post("/createtask", validateProjectTask, createTaskController);
router.get("/gettask", validateProjectTask, getTaskController);
router.put("/updatetask/:taskId", validateProjectTask, updateTaskController);
router.delete("/deletetask/:taskId", validateProjectTask, deleteTaskController);

export default router;
