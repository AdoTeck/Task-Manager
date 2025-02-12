import { Request, Response } from "express";
import { CreateTaskService } from "../services/task.service";

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
    res.status(201).json({ message: "Todo Created successfully", taskCreate });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
