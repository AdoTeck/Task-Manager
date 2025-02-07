import { Projects, IProject } from "../models/projects.models";
import mongoose from "mongoose";

export const CreateProject = async (projectData: Partial<IProject>) => {
  // Validate required fields
  if (!projectData.User || !projectData.ProjectTitle || !projectData.ProjectDescription || !projectData.DueDate) {
    throw new Error("Missing required fields: User, ProjectTitle, ProjectDescription, or DueDate");
  }

  try {
    const newProject = new Projects({
      ...projectData,
      User: new mongoose.Types.ObjectId(projectData.User.toString()), // Ensure ObjectId format
      Category: Array.isArray(projectData.Category) ? projectData.Category : [projectData.Category].filter(Boolean)
    });

    return await newProject.save();
  } catch (error: any) {
    throw new Error(`Failed to create project: ${error.message}`);
  }
};

export const GetProject = async (userId: string) => {
  try {
    const projects = await Projects.find({ User: userId })
      .select("ProjectTitle ProjectDescription DueDate PriorityLevel Status Category createdAt updatedAt");
    return projects;
  } catch (error: any) {
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }
};