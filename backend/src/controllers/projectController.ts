import { Request, Response } from "express";
import { CreateProject } from "../services/projectService";
import { console } from "inspector";

export const createProject = async (req: Request, res: Response) => {
  try {
    // Validate required fields
    const { ProjectTitle, ProjectDescription, DueDate } = req.body;
    console.log(req.body)
    
    if (!ProjectTitle || !ProjectDescription || !DueDate) {
      return res.status(400).json({ 
        error: "Missing required fields. Please provide title, description, and due date." 
      });
    }

    const projectData = {
      ...req.body,
      User: req.user.id
    };

    const newProject = await CreateProject(projectData);
    res.status(201).json({ 
      message: "Project created successfully", 
      project: newProject 
    });
  } catch (error: any) {
    console.error("Project creation error:", error);
    res.status(400).json({ 
      error: error.message || "Failed to create project" 
    });
  }
};