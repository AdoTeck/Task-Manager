import { Request, Response } from "express";
import {CreateTaskService } from "../services/task.service"

export const createTaskController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projectID = req.body.projectID?.id; // Get the user ID from the request
    if (!projectID) {
      res.status(401).json({ error: "Project Not Found" });
      return;
    }
    const taskCreate = await CreateTaskService(req.body, projectID);
    res.status(201).json({ message: "Todo Created successfully", taskCreate });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
