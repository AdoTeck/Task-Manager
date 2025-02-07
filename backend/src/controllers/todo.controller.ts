import { Request, Response } from "express";
import {
  CreateTodoService,
  GetTodoService,
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
