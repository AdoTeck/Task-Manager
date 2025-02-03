import { Projects, IProject } from "../models/Projects";
import mongoose from "mongoose";

export const CreateProject = async (projectData: Partial<IProject>) => {
  // Validate required fields
  if (!projectData.User || !projectData.ProjectTitle || !projectData.ProjectDescription || !projectData.DueDate) {
    throw new Error("Missing required fields: User, ProjectTitle, ProjectDescription, or DueDate");
  }

  try {
    const newProject = new Projects({
      ...projectData,
      User: new mongoose.Types.ObjectId(projectData.User.toString()),
      Category: Array.isArray(projectData.Category) ? projectData.Category : [projectData.Category].filter(Boolean)
    });

    const savedProject = await newProject.save();
    return savedProject;
  } catch (error: any) {
    throw new Error(`Failed to create project: ${error.message}`);
  }
};

export const GetProject = async () => {
  try {
    const projects = await Projects.find().select("ProjectTitle ProjectDescription DueDate");
    return projects;
  } catch (error: any) {
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }
};