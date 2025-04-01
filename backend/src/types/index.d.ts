import mongoose, { Types } from 'mongoose';

export interface IProject extends mongoose.Document {
  User: mongoose.Types.ObjectId;
  ProjectTitle: string;
  ProjectDescription: string;
  DueDate: Date;
  PriorityLevel: 'low' | 'medium' | 'high';
  Status: 'Completed' | 'In Progress' | 'In Review';
  Category: string;
}
export interface ITodo extends mongoose.Document {
  User: mongoose.Types.ObjectId;
  Title: string;
  Description: string;
  Completed: boolean;
}
export interface ITask extends mongoose.Document {
  ProjectID: mongoose.Types.ObjectId;
  Title: string;
  Description: string;
  Status: "Pending" | "In Progress" | "Completed";
  Deadline: Date;
  PriorityLevel: "Low" | "Medium" | "High";
  EstimateTime: number;
}

export interface IUser extends mongoose.Document {
  userName: string;
  fullName: string;
  email: string;
  password: string;
  refecode: string;
  isGoogleUser: boolean;
  googleId: string;
}

interface IUserInfo {
  userID: Types.ObjectId;
  role: string;
  projectID: Types.ObjectId;
  isApproved: boolean;
  permissions: "Editor" | "Viewer" | "Maintainer";
}

export interface IProjectAccess {
  parentUser?: Types.ObjectId;
  userInfo: IUserInfo[];
}

export interface IAccessRequest extends mongoose.Document {
  requesterId: mongoose.Types.ObjectId;
  ownerId: mongoose.Types.ObjectId;
  status: "pending" | "approved" | "denied";
  createdAt: Date;
  isApproved: boolean;
  isChecked: boolean;
}

export interface UserData extends mongoose.Document {
  refecode: string;
  userID: string;
  permission?: string;
  role?: string;
  projectID?: string;
  isApproved: boolean;
  permissions?: "Editor" | "Viewer" | "Maintainer";
}