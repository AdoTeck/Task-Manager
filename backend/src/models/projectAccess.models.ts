import mongoose, { Schema } from "mongoose";
import { IProjectAccess } from "../types/index";

const projectAccessSchema = new Schema({
  parentUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  userInfo: [
    {
      userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      isApproved: {
        type: Boolean,
        required: true
      },
      // Optional fields that can be updated later
      role: {
        type: String,
        required: false
      },
      projectID: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: false
      },
      permissions: {
        type: String,
        enum: ["Editor", "Viewer", "Maintainer"],
        required: false
      }
    }
  ]
});

export const ProjectAccess = mongoose.model<IProjectAccess>("ProjectAccess", projectAccessSchema);
