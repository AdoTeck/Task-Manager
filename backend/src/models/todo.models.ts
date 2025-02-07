import mongoose from "mongoose";
import { ITodo } from "../types/index";

const TodoSchema = new mongoose.Schema(
  {
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    TodoTitle: {
      type: String,
      required: true,
    },
    TodoDescription: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Todo = mongoose.model<ITodo>("Todo", TodoSchema);
