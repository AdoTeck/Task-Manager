import { Projects, IProject } from "../models/Projects";

export const CreateProject = async (ProjectData: IProject) => {
  const { User, ProjectTitle, ProjectDescription, DueDate, PriorityLevel, Category, Status } = ProjectData;

  const newProject = new Projects({
    User,
    ProjectTitle,
    ProjectDescription,
    DueDate,
    PriorityLevel,
    Category,
    Status
  });

  await newProject.save();
  return { id: newProject._id, userName: newProject.ProjectTitle, Category: newProject.Category, Status: newProject.Status };
};