import express from 'express';
import { createTaskController } from '../controllers/task.controller';
import { validateProjectTask } from '../middleware/taskaccess.middleware';

const router = express.Router();

router.post('/createtask', validateProjectTask , createTaskController );

export default router;