import { User } from "../models/user.models";
import { Types } from "mongoose";
import { AccessRequest } from "../models/accessRequest.models";
import { ProjectAccess } from "../models/projectAccess.models";
import { IAccessRequest } from "../types/index";
interface UserData {
  refecode: string;
  userID: string;
  role: string;
  projectID: string;
  isApproved: boolean;
  permissions: "Editor" | "Viewer" | "Maintainer";
}

export const accessService = async (userId: string, userData: UserData) => {
  const { refecode } = userData;
  const owner = await User.findOne({ refecode }).select("_id fullName");
  if (!owner) {
    throw new Error("User not found for the provided refecode.");
  }

  const existingRequest = await AccessRequest.findOne({
    requesterId: userId,
    ownerId: owner._id,
    status: "pending",
  });

  if (existingRequest) {
    throw new Error("Access request is already pending.");
  }
  const newRequest = await AccessRequest.create({
    requesterId: userId,
    ownerId: owner._id,
    status: "pending",
    createdAt: new Date(),
  });
  return {
    message: "Access request sent successfully",
    request: newRequest,
    notifyOwner: {
      userId: owner._id,
      fullName: owner.fullName,
      notification: `User ${userId} has requested access.`,
    },
  };
};

export const getNotificationService = async (userId: string) => {
  console.log(userId);
  const accessRequests = await AccessRequest.find({
    ownerId: userId,
    isApproved: false,
  }).select("status isApproved isChecked createdAt");
  if (!accessRequests) {
    throw new Error("No access requests found for the user.");
  }
  console.log(accessRequests);
  return accessRequests;
};

export const updateNotificationService = async (
  ownerId: string,
  userData: IAccessRequest
) => {
  const { isApproved, isChecked, status } = userData;
  console.log(userData);
  console.log(ownerId);

  if (!ownerId) {
    throw new Error("User not found.");
  }
  const updatedRequest = await AccessRequest.findOneAndUpdate(
    { ownerId: ownerId },
    { isApproved, isChecked, status },
    { new: true }
  );
  if (!updatedRequest) {
    throw new Error("Error updating access request.");
  }
  return updatedRequest;
};

export const addUserService = async (parentId: string, userData: UserData) => {
  try {
    const { userID, role, projectID, isApproved, permissions } = userData;
    const existingAccess = await ProjectAccess.findOne({
      parentUser: parentId,
    });

    if (existingAccess) {
      existingAccess.userInfo.push({
        userID: new Types.ObjectId(userID),
        role,
        projectID: new Types.ObjectId(projectID),
        isApproved,
        permissions,
      });

      await existingAccess.save();
      return existingAccess;
    }

    // If no existing access, create a new document
    const newAccess = new ProjectAccess({
      parentUser: new Types.ObjectId(parentId),
      userInfo: [
        {
          userID: new Types.ObjectId(userID),
          role,
          projectID: new Types.ObjectId(projectID),
          isApproved,
          permissions,
        },
      ],
    });

    await newAccess.save();
    return newAccess;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
