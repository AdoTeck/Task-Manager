import { Request, Response } from "express";
import {
  CreateTaskService,
  GetTaskService,
  UpdateTaskService,
  DeleteTaskService,
} from "../services/task.service";

export const createTaskController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projectID = req.body.ProjectID; // Ensure the correct field name is used
    if (!projectID) {
      res.status(401).json({ error: "Project Not Found" });
      return;
    }
    const taskCreate = await CreateTaskService(req.body, projectID);
    res.status(201).json({ message: "Task Created successfully", taskCreate });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getTaskController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projectID = req.body.ProjectID;
    if (!projectID) {
      res.status(401).json({ error: "Project Not Found" });
      return;
    }
    const task = await GetTaskService(projectID);
    res.status(200).json({ message: "Task fetched successfully", task });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTaskController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projectID = req.body.ProjectID;
    const { taskId } = req.params;
    if (!projectID) {
      res.status(401).json({ error: "Project Not Found" });
      return;
    }
    const task = await UpdateTaskService(req.body, taskId);
    res.status(200).json({ message: "Task fetched successfully", task });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTaskController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projectID = req.body.ProjectID;
    const { taskId } = req.params;
    if (!projectID) {
      res.status(401).json({ error: "Project Not Found" });
      return;
    }
    const task = await DeleteTaskService(taskId);
    res.status(200).json({ message: "Task fetched successfully", task });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
