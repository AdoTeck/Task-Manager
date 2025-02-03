import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtils';

// Define the user interface for the token payload
interface UserPayload {
  id: string;
  email: string;
  userName: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', authHeader);
    
    if (!authHeader?.startsWith('Bearer ')) {
      console.error('Authorization header missing or does not start with Bearer');
      return next(new Error('Authorization header required'));
    }

    const token = authHeader.split(' ')[1];
    console.log('Token:', token);
    const decoded = verifyToken(token) as UserPayload;
    console.log('Decoded Token:', decoded);
    
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'jwt expired') {
        console.error('Token verification failed: Token has expired');
        return next(new Error('Token has expired'));
      }
      console.error('Token verification failed:', error.message);
    } else {
      console.error('Token verification failed:', error);
    }
    next(new Error('Invalid or expired token'));
  }
};