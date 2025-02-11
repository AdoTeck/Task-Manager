import mongoose from "mongoose";
import { ITask } from "../types/index";

const TaskSchema = new mongoose.Schema(
  {
    ProjectID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Projects",
      required: true,
    },
    Title: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"], 
      default: "Pending",
    },
    Deadline: {
      type: Date,
      required: true,
    },
    PriorityLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
      required: true,
    },
    EstimateTime: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model<ITask>("Task", TaskSchema);
