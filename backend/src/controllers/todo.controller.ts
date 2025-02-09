import { Request, Response } from "express";
import {
  CreateTodoService,
  GetTodoService,
  UpdateTodoService,
  DeleteTodoService,
} from "../services/todo.service";

export const createTodoController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id; // Get the user ID from the request
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const todoCreate = await CreateTodoService(req.body, userId);
    res.status(201).json({ message: "Todo Created successfully", todoCreate });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const getTodoController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const todo = await GetTodoService(userId);
    res.status(200).json({ message: "Todo fetched successfully", todo });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

export const updateTodoController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = req.body;
    const { todoId } = req.params;
    const updatedTodo = await UpdateTodoService(todoId, data);
    res.status(200).json({ message: "Todo updated successfully ", updatedTodo });
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error });
  }
};

export const deleteTodoController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const { todoId } = req.params;
    const todo = await DeleteTodoService(todoId);
    res.status(200).json({ message: "Todo deleted successfully", todo });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};
