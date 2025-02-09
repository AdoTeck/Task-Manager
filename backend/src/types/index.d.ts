  import mongoose from 'mongoose';

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

export interface IUser extends mongoose.Document {
  userName: string;
  fullName: string;
  email: string;
  password: string;
 
}