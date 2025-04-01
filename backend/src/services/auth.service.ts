import { User } from "../models/user.models";
import { IUser } from "../types/index";
import { Projects } from "../models/projects.models";
import bcrypt from "bcrypt";
import { generateToken } from '../utils/jwt.utils';

export const registerUser = async (userData: IUser, googleAuth = false) => {
  const { userName, fullName, email, password, googleId } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists with this email.");
  }

  let hashedPassword = undefined;
  if (!googleAuth && password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  // Create and save user
  const newUser = new User({
    userName,
    fullName,
    email,
    password: hashedPassword, // Will be undefined if Google Sign-In
    googleId: googleAuth ? googleId : undefined, // Only store Google ID if signing in with Google
    refecode: Math.random().toString(36).substring(2, 8),
  });

  await newUser.save();
  return { id: newUser._id, userName: newUser.userName, email: newUser.email, referenceCode: newUser.refecode };
};

export const loginUser = async (email: string, password?: string, googleAuth = false, googleId?: string) => {
  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }
  if (googleAuth) {
    if (!user.googleId) throw new Error("User registered without Google, please log in with email/password.");
    if (googleId !== user.googleId) throw new Error("Google authentication failed.");
  } else {
    if (!user.password || !password) throw new Error("Invalid credentials");
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid credentials");
  }

  // Generate JWT token
  const token = generateToken(user);

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      userName: user.userName,
      fullName: user.fullName,
      googleAuth: !!user.googleId,
    }
  };
};

export const getUserProfileService = async (userId: string) => {
  const user = await User.findById(userId).select("fullName email refecode googleId");
  if (!user) {
    throw new Error("User not found");
  }
  const totalProjects = await Projects.countDocuments({ User: userId });
  return { user, totalProjects, refecode: user.refecode };
};

export const updateUserProfileService = async (userId: string, updates: Partial<IUser>) => {
  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }
  const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select("fullName email");
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};