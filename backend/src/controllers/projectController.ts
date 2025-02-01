import { Request, Response } from "express";
import { CreateProject } from "../services/projectService";

export const createProject = async (req: Request, res: Response) => {
  try {
    const createProject = await CreateProject({ ...req.body, User: req.user._id });
    res.status(201).json({ message: "Project Created successfully", createProject });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};