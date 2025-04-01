import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/index";

const userSchema = new Schema<IUser>(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      minlength: 8,
      maxlength: 128,
    },
    refecode: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 6,
      unique: true,
    },
    isGoogleUser: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", userSchema);