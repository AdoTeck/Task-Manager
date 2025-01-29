import express, { Router } from 'express';
import { TaskController } from '../controllers/taskController';

const router: Router = express.Router();
const taskController = new TaskController();

router.get('/', taskController.getAllTasks);

export { router };