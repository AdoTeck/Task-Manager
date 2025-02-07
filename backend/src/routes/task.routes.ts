import express, { Router } from 'express';
import { TaskController } from '../controllers/task.controller';

const router: Router = express.Router();
const taskController = new TaskController();

router.get('/', taskController.getAllTasks);

export { router };