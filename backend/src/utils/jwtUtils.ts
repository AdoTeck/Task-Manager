import jwt, { SignOptions } from 'jsonwebtoken';
import { IUser } from '../models/User';
import { config } from '../config/env';



const JWT_SECRET = config.JWT_SECRET || 'your-secret-key'; // In production, always use environment variable
const JWT_EXPIRE: SignOptions['expiresIn'] = config.JWT_EXPIRES_IN as SignOptions['expiresIn'] || '1d';

export const generateToken = (user: IUser): string => {
  return jwt.sign(
    { 
      id: user._id,
      email: user.email,
      userName: user.userName 
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRE }
  );
};

export const verifyToken = (token: string) => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid token');
    }
  };