import { User, IUser } from "../models/User";
import bcrypt from "bcrypt";

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
