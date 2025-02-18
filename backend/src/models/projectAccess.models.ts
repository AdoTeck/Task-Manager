import mongoose, { Schema } from "mongoose";
import { IProjectAccess } from "../types/index";
const projectAccessSchema = new Schema({
  parentUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false
  },
  userInfo: [
    {
      userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      role: {
        type: String,
        required: true
      },
      projectID: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true
      },
      isApproved: {
        type: Boolean,
        required: true
      },
      permissions: {
        type: String,
        enum: ["Editor", "Viewer", "Maintainer"],
        required: true
      }
    }
  ]
});

export const ProjectAccess = mongoose.model<IProjectAccess>("ProjectAccess", projectAccessSchema);
