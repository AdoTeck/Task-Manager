import { Request, Response, NextFunction } from 'express';

export class TaskController {
  async getAllTasks(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json({
        status: 'success',
        data: {
          message: 'Welcome to the Task API!'
        }
      });
    } catch (error) {
      next(error);
    }
  }
}