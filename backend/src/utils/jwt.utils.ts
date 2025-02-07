import jwt, { SignOptions } from 'jsonwebtoken';
import { IUser } from '../models/user.models';
import { config } from '../config/env';



const JWT_SECRET = config.JWT_SECRET || 'your-secret-key'; // In production, always use environment variable
const JWT_EXPIRE: SignOptions['expiresIn'] = config.JWT_EXPIRES_IN as SignOptions['expiresIn'] || '7d'; // Set to 7 days

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
    console.log('Verifying token:', token);
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Token decoded successfully:', decoded);
    return decoded;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error verifying token:', error.message);
    } else {
      console.error('Error verifying token:', error);
    }
    throw new Error('Invalid token');
  }
};