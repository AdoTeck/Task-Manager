import { ITask } from "../types/index";
import { Task } from "../models/task.models";

export const CreateTaskService = async (userData: ITask, projectID: string) => {
  const { Title, Description, Status, Deadline, PriorityLevel, EstimateTime } =
    userData;

  const existingTask = await Task.findOne({ Title });
  if (existingTask) {
    throw new Error("Task already exists with this title.");
  }
  const newTask = new Task({
    ProjectID: projectID,
    Title,
    Description,
    Status,
    Deadline,
    PriorityLevel,
    EstimateTime,
  });

  await newTask.save();
  return {
    id: newTask._id,
    Title: newTask.Title,
    Description: newTask.Description,
    Status: newTask.Status,
    Deadline: newTask.Deadline,
    PriorityLevel: newTask.PriorityLevel,
    EstimateTime: newTask.EstimateTime,
  };
};

export const GetTaskService = async (projectID: string) => {
  const tasks = await Task.find({ ProjectID: projectID }).select(
    "Title Description Status Deadline PriorityLevel EstimateTime"
  );
  return tasks;
};

export const UpdateTaskService = async (userData: ITask, taskId: string) => {
  try {
    const task = await Task.findByIdAndUpdate(taskId, userData, { new: true });
    return task;
  } catch (error) {
    throw new Error("Error updating todo");
  }
};

export const DeleteTaskService = async (
  taskId: string,
) => {
  const task = await Task.findByIdAndDelete(taskId);
  if (!task) {
    throw new Error("Task not found");
  }
  return task;
};
