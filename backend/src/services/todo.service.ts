import { ITodo } from "../types";
import { Todo } from "../models/todo.models";

export const CreateTodoService = async (userData: ITodo, userId: string) => {
  const { TodoTitle, TodoDescription } = userData;

  const existingTodo = await Todo.findOne({ TodoTitle });
  if (existingTodo) {
    throw new Error("Todo already exists with this title.");
  }
  const newTodo = new Todo({
    User: userId,
    TodoTitle,
    TodoDescription,
  });

  await newTodo.save();
  return { id: newTodo._id, TodoTitle: newTodo.TodoTitle, TodoDescription: newTodo.TodoDescription };
};

export const UpdateTodoService = async (id: string, data: any) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, data, { new: true });
        return updatedTodo;
    } catch (error) {
        throw new Error("Error updating todo");
    }
};

export const GetTodoService = async (userId: string) => {
  const todos = await Todo.find({ User: userId }).select("TodoTitle TodoDescription createdAt");
  return todos;
};

export const DeleteTodoService = async (todoId: string) => {
  const todo = await Todo.findByIdAndDelete(todoId);
  return todo;
};