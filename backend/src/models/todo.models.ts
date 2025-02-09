import mongoose from "mongoose";
import { ITodo } from "../types/index";

const TodoSchema = new mongoose.Schema(
  {
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    Completed : {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

export const Todo = mongoose.model<ITodo>("Todo", TodoSchema);
