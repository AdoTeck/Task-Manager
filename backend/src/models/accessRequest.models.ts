import mongoose, { Schema } from "mongoose";
import { IAccessRequest } from "../types/index";

const AccessRequestSchema = new Schema<IAccessRequest>({
  history: [
    {
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
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

export const AccessRequest = mongoose.model<IAccessRequest>(
  "AccessRequest",
  AccessRequestSchema
);
