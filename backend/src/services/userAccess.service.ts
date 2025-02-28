import { Types } from "mongoose";
import { ProjectAccess } from "../models/projectAccess.models";
import { AccessRequest } from "../models/accessRequest.models";
import { Projects } from "../models/projects.models";
import { User } from "../models/user.models";

interface UserData {
  refecode: string;
  userID: string;
  permission?: string;
  role?: string;
  projectID?: string;
  isApproved: boolean;
  permissions?: "Editor" | "Viewer" | "Maintainer";
}

export const addUserService = async (parentId: string, userData: UserData) => {
  try {
    const { userID, isApproved, role = "Viewer", permissions = "Viewer", projectID } = userData;

    // Convert IDs safely
    const parentUserId = new Types.ObjectId(parentId);
    const userObjectId = new Types.ObjectId(userID);
    const projectObjectId = projectID ? new Types.ObjectId(projectID) : undefined;

    // Check for existing user access
    const existingAccess = await ProjectAccess.findOne({ parentUser: parentUserId });

    if (existingAccess) {
      existingAccess.userInfo.push({
        userID: userObjectId,
        role, // Now always a valid string
        permissions,
        isApproved,
        projectID: projectObjectId || new Types.ObjectId(), // Ensure projectID is always an ObjectId
      });

      await existingAccess.save();
      return existingAccess;
    }

    // Create new document if no existing access
    const newAccess = new ProjectAccess({
      parentUser: parentUserId,
      userInfo: [
        {
          userID: userObjectId,
          role,
          permissions,
          isApproved,
          projectID: projectObjectId || new Types.ObjectId(),
        },
      ],
    });

    await newAccess.save();
    return newAccess;
  } catch (error: any) {
    throw new Error(`Error in addUserService: ${error.message}`);
  }
};


export const getUserService = async (userId: string) => {
  const accessRequest = await AccessRequest.findOne({ ownerId: userId }).select("requesterId");
  
  if (!accessRequest) {
    throw new Error("No access request found for the specified user");
  }

  // Fetch user information and project details in parallel
  const [userInfo, projectInfo] = await Promise.all([
    User.find({ _id: accessRequest.requesterId }).select("fullName"),
    Projects.find({ User: userId }).select("ProjectTitle")
  ]);

  // Merge user and project data into a single array
  const mergedData = [...userInfo, ...projectInfo];

  // ✅ Return merged data directly as an array
  return mergedData;
};