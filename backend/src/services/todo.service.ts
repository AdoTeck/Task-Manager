import { ITodo } from "../types";
import { Todo } from "../models/todo.models";

export const CreateTodoService = async (userData: ITodo, userId: string) => {
  const { Title, Description,Completed } = userData;

  const existingTodo = await Todo.findOne({ Title });
  if (existingTodo) {
    throw new Error("Todo already exists with this title.");
  }
  const newTodo = new Todo({
    User: userId,
    Title,
    Description,
    Completed
  });

  await newTodo.save();
  return { id: newTodo._id, Title: newTodo.Title, Description: newTodo.Description, Completed: newTodo.Completed };
};

export const UpdateTodoService = async (todoId: string, data: any) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(todoId, data, { new: true });
        return updatedTodo;
    } catch (error) {
        throw new Error("Error updating todo");
    }
};

export const GetTodoService = async (userId: string) => {
  const todos = await Todo.find({ User: userId }).select("Title Description createdAt Completed");
  return todos;
};

export const DeleteTodoService = async (todoId: string) => {
  const todo = await Todo.findByIdAndDelete(todoId);
  if (!todo) {
    throw new Error("Todo not found");
  }
  return todo;
};