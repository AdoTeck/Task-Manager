import mongoose, { Schema } from "mongoose";

const projectAccessSchema = new Schema({
  projectId: { 
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: false
 },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
},
  role: {
    type: String,
    enum: ["viewer", "editor", "admin"],
    default: "viewer",
}, 
});

export const ProjectAccess = mongoose.model(
  "ProjectAccess",
  projectAccessSchema
);
