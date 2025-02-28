import { Types } from "mongoose";
import { ProjectAccess } from "../models/projectAccess.models";
import { AccessRequest } from "../models/accessRequest.models";
import { Projects } from "../models/projects.models";
import { User } from "../models/user.models";

interface UserData {
  refecode: string;
  userID: string;
  role?: string;
  projectID?: string;
  isApproved: boolean;
  permissions?: "Editor" | "Viewer" | "Maintainer";
}

export const addUserService = async (parentId: string, userData: UserData) => {
  try {
    const { userID, isApproved } = userData;
    const existingAccess = await ProjectAccess.findOne({
      parentUser: parentId,
    });

    // if (existingAccess) {
    //   existingAccess.userInfo.push(
    //     {
    //       userID: new Types.ObjectId(userID),
    //       isApproved,
    //     });

    //   await existingAccess.save();
    //   return existingAccess;
    // }

    // If no existing access, create a new document
    const newAccess = new ProjectAccess({
      parentUser: new Types.ObjectId(parentId),
      userInfo: [
        {
          userID: new Types.ObjectId(userID),
          isApproved,
        },
      ],
    });

    await newAccess.save();
    return newAccess;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUserService = async (userId: string) => {
  const accessRequest = await AccessRequest.findOne({ ownerId: userId }).select("requesterId");
  if (!accessRequest) {
    throw new Error("No access request found for the specified user");
  }
  const [userInfo, projectInfo] = await Promise.all([
    User.find({ _id: accessRequest.requesterId }).select("fullName"),
    Projects.find({ User: userId }).select("ProjectTitle")
  ]);
  const mergedData = [...userInfo, ...projectInfo];
  return { userData: mergedData };
}