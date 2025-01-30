import { User, IUser } from "../models/User";
import bcrypt from "bcrypt";
import { generateToken } from '../utils/jwtUtils';

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

