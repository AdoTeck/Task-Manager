// middleware/google-auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const verifyGoogleToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token } = req.body;
    
    if (!token) {
       res.status(400).json({ message: 'Google token is required' });
       return
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    
    if (!payload) {
       res.status(401).json({ message: 'Invalid Google token' });
       return
    }

    // Add Google user data to request
    req.googleUser = {
      googleId: payload.sub,
      email: payload.email!,
      fullName: payload.name!,
      picture: payload.picture
    };

    next();
  } catch (error) {
     res.status(401).json({ message: 'Google authentication failed' });
     return
  }
};