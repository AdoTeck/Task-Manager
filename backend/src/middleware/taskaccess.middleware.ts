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
      return;
    }

    console.log("Project ID:", projectID); // Log the project ID

    const project = await Projects.findById(projectID);

    if (!project) {
      console.log("Project not found for ID:", projectID); // Log if project is not found
      res.status(404).json({ error: "Project not found" });
      return;
    }

    console.log("Project found:", project); // Log the found project

    next();
  } catch (error: any) {
    console.error("Error in validateProjectTask middleware:", error);
    res.status(500).json({ error: "Server error" });
    return;
  }
};
