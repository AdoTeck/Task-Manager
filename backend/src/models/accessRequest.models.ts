import mongoose, { Document, Schema } from "mongoose";
import { IAccessRequest } from "../types/index";

const AccessRequestSchema = new Schema<IAccessRequest>({
  requesterId: { 
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
},
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true 
},
  status: {
    type: String,
    enum: ["pending", "approved", "denied"],
    default: "pending",
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  isChecked: {
    type: Boolean,
    default: false,
  },  
  createdAt: { type: Date, default: Date.now },
});

export const AccessRequest = mongoose.model<IAccessRequest>(
  "AccessRequest",
  AccessRequestSchema
);
