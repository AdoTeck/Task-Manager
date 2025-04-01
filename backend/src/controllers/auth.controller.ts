import { Request, Response } from "express";
import { registerUser, loginUser, getUserProfileService, updateUserProfileService } from "../services/auth.service";
import { User } from "../models/user.models";

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    const result = await loginUser(email, password);
    
    // Set HTTP-only cookie with token
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'strict', // Prevent CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week expiration
      path: '/', // Available across all routes
    });

    // Remove token from response body
    const { token, ...responseData } = result;

    res.status(200).json({
      message: 'Login successful',
      ...responseData,
      token // Include token in response body for frontend to store in localStorage
    });
  } catch (error) {
    res.status(401).json({ message: 'Login failed' });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.cookie('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0),
      path: '/',
    });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Logout failed' });
  }
};

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user || !req.user.id) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }
    const { user, totalProjects } = await getUserProfileService(req.user.id);
    res.status(200).json({ ...user.toObject(), totalProjects });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { confirmPassword, ...updates } = req.body; // Exclude confirmPassword from updates
    if (!req.user || !req.user.id) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }
    const user = await updateUserProfileService(req.user.id, updates);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const googleAuth = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.googleUser) {
      res.status(400).json({ message: 'Google user data is required' });
      return;
    }

    const { googleId, email, fullName } = req.googleUser;
    
    // Check if user exists with this email
    let user = await User.findOne({ email });
    
    let result;
    
    if (user) {
      // User exists, let's login
      if (user.isGoogleUser && user.googleId === googleId) {
        // Google user is logging in with Google again
        result = await loginUser(email, undefined, true, googleId);
      } else if (user.isGoogleUser && user.googleId !== googleId) {
        // This is a different Google account with the same email
        res.status(400).json({ message: 'Email already registered with a different Google account' });
        return;
      } else {
        // User has a password account but is trying to log in with Google
        res.status(400).json({ message: 'Email already registered with password. Please login with email/password' });
        return;
      }
    } else {
      // New user, let's register
      const userName = email.split('@')[0] + Math.floor(Math.random() * 1000);
      
      // Prepare new Google user data
      const userData = {
        userName,
        fullName,
        email,
        googleId,
        isGoogleUser: true,
        password: '', 
        refecode: Math.random().toString(36).substring(2, 8),
      };
      
      // Change is here: wrap userData with new User() to satisfy IUser type requirements
      await registerUser(new User(userData), true);
      result = await loginUser(email, undefined, true, googleId);
    }
    
    // Set HTTP-only cookie with token
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
      path: '/',
    });

    // Send response
    const { token, ...responseData } = result;
    
    res.status(200).json({
      message: 'Google authentication successful',
      ...responseData,
      token
    });
  } catch (error: any) {
    res.status(401).json({ message: error.message || 'Google authentication failed' });
  }
};