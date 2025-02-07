import express from "express";
import { authenticateUser } from "../middleware/auth.middleware";
import { createTodoController,getTodoController,deleteTodoController } from "../controllers/todo.controller";
const router = express.Router();

router.post("/createtodo", authenticateUser, createTodoController );
router.get("/gettodo", authenticateUser,getTodoController );
router.put("/updatetodo", authenticateUser, );
router.delete("/deletetodo", authenticateUser,deleteTodoController );

export default router;