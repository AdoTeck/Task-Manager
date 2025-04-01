import { Request, Response } from "express";
import { GetProject ,CreateProject} from "../services/project.service";
import mongoose from "mongoose";

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

    console.log("User", req.user!.id);

    // Call the service function to create a new project
    const newProject = await CreateProject({
      User: new mongoose.Types.ObjectId(req.user!.id), // From auth middleware
      ProjectTitle,
      ProjectDescription,
      DueDate,
      PriorityLevel: PriorityLevel || "medium", // Default value
      Status: Status || "In Progress", // Default value
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
    const userId = req.user?.id;
    if (!userId) {
      res.status(400).json({
        success: false,
        error: "User ID is missing"
      });
      return;
    }
    const projects = await GetProject(userId); 

    res.status(200).json({
      success: true,
      data: projects
    });
  } catch (error: any) {
    console.error("Failed to fetch projects:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch projects"
    });
  }
};