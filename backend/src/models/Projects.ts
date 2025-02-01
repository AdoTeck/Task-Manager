import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  User : Schema.Types.ObjectId;
  ProjectTitle : string;
  ProjectDescription : string;
  DueDate: Date;
  PriorityLevel: string;
  Status: string;
  Category: string;
 
}

const projectSchema = new Schema<IProject>(

  {
    User: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ProjectTitle: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    ProjectDescription: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    DueDate: {
      type: Date,
      required: true,
      unique: true,
    },
    PriorityLevel: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 128,
    },
    Status: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 128,
    },
  Category: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 128,
  }
},
{
  timestamps: true,
}
);

export const Projects = mongoose.model<IProject>("Project", projectSchema);