import { Request, Response } from "express";
import { Projects, IProject } from "../models/Projects";

export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      ProjectTitle, 
      ProjectDescription, 
      DueDate, 
      PriorityLevel, 
      Status, 
      Category 
    } = req.body;

    // Validate required fields
    if (!ProjectTitle || !ProjectDescription || !DueDate) {
      res.status(400).json({ 
        success: false,
        error: "Missing required fields" 
      });
      return;
    }
    console.log("User", req.user!.id)
    // Create new project using your Projects model
    const newProject = await Projects.create({
      User: req.user!.id, // From auth middleware
      ProjectTitle,
      ProjectDescription,
      DueDate,
      PriorityLevel: PriorityLevel || 'medium',
      Status: Status || 'In Progress',
      Category
    });

    res.status(201).json({
      success: true,
      data: newProject
    });

  } catch (error: any) {
    console.error("Project creation error:", error);
    res.status(400).json({
      success: false,
      error: error.message || "Failed to create project"
    });
  }
};

export const getProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await Projects.find().select("ProjectTitle ProjectDescription DueDate")
    res.status(200).json(projects)
  } catch (error: any) {
    console.error("Failed to fetch projects:", error)
    res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch projects"
    })
  }
}