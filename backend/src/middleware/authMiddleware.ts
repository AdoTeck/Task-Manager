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
    let token;
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', authHeader);
    
    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    } else {
      console.error('Authorization header or token cookie missing');
      res.status(401).json({ error: 'Authorization header or token cookie required' });
      return 
    }

    console.log('Token:', token);
    const decoded = verifyToken(token) as UserPayload;
    console.log('Decoded Token:', decoded);
    
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'jwt expired') {
        console.error('Token verification failed: Token has expired');
        res.status(401).json({ error: 'Token has expired' });
        return;
      }
      console.error('Token verification failed:', error.message);
    } else {
      console.error('Token verification failed:', error);
    }
    res.status(401).json({ error: 'Invalid or expired token' });
    return;
  }
};