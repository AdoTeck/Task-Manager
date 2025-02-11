import { Request, Response, NextFunction } from "express";
import { Projects } from "../models/projects.models";

export const validateProjectTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projectID =
      req.body.ProjectID || req.params.ProjectID || req.query.ProjectID;
      
    if (!projectID) {
    res.status(400).json({ error: "Project ID is required" });
    return
    }

    const project = await Projects.findById(projectID);
    console.log(project);
    if (!project) {
    res.status(404).json({ error: "Project not found" });
    return
    }

    next();
  } catch (error: any) {
    console.error("Error in validateProjectTask middleware:", error);
    res.status(500).json({ error: "Server error" });
    return
  }
};
