import mongoose, { Document } from "mongoose";

export interface IProject extends Document {
  User: mongoose.Types.ObjectId;
  ProjectTitle: string;
  ProjectDescription: string;
  DueDate: Date;
  PriorityLevel: 'low' | 'medium' | 'high';
  Status: 'Completed' | 'In Progress' | 'In Review';
  Category: string;
}

const ProjectSchema = new mongoose.Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ProjectTitle: {
    type: String,
    required: true
  },
  ProjectDescription: {
    type: String,
    required: true
  },
  DueDate: {
    type: Date,
    required: true
  },
  PriorityLevel: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  Status: {
    type: String,
    enum: ['Completed', 'In Progress', 'In Review'],
    default: 'In Progress'
  },
  Category: {
    type: [String], // Change to array of strings
    required: true
  }
});

export const Projects = mongoose.model<IProject>('Projects', ProjectSchema);