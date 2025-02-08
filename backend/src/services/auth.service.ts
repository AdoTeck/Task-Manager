import { User } from "../models/user.models";
import { IUser } from "../types/index";
import { Projects } from "../models/projects.models";
import bcrypt from "bcrypt";
import { generateToken } from '../utils/jwt.utils';

export const registerUser = async (userData: IUser) => {
  const { userName, fullName, email, password } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists with this email.");
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create and save user
  const newUser = new User({
    userName,
    fullName,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  return { id: newUser._id, userName: newUser.userName, email: newUser.email };
};

export const loginUser = async (email: string, password: string) => {
  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  // Generate JWT token
  const token = generateToken(user);

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      userName: user.userName,
      fullName: user.fullName
    }
  };
};

export const getUserProfileService = async (userId: string) => {
  const user = await User.findById(userId).select("fullName email");
  if (!user) {
    throw new Error("User not found");
  }
  const totalProjects = await Projects.countDocuments({ User: userId });
  return { user, totalProjects };
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