import { User } from "../models/user.models";
import { AccessRequest } from "../models/accessRequest.models";
import { IAccessRequest } from "../types/index"
interface UserData {
    refecode: string;
}

export const accessService = async (userId: string, userData: UserData) => {
    const { refecode } = userData;
    const owner = await User.findOne({ refecode }).select('_id fullName');
    if (!owner) {
        throw new Error("User not found for the provided refecode.");
    }

    const existingRequest = await AccessRequest.findOne({ requesterId: userId, ownerId: owner._id, status: "pending" });

    if (existingRequest) {
        throw new Error("Access request is already pending.");
    }
    const newRequest = await AccessRequest.create({
        requesterId: userId,
        ownerId: owner._id,
        status: "pending",
        createdAt: new Date()
    });
    return {
        message: "Access request sent successfully",
        request: newRequest,
        notifyOwner: {
            userId: owner._id,
            fullName: owner.fullName,
            notification: `User ${userId} has requested access.`
        }
    };
};

export const getNotificationService = async (userId: string) => {
    console.log(userId)
    const accessRequests = await AccessRequest.find({ ownerId: userId, status: "pending" }).select("_id requesterId status isApproved isChecked createdAt");
    if(!accessRequests)
    {
        throw new Error("No access requests found for the user.");
    }
    console.log(accessRequests)
    return accessRequests;
}

export const updateNotificationService = async (userId: string, notificationId: string, updateValues: Partial<IAccessRequest>) => {
    return await AccessRequest.findOneAndUpdate(
        { _id: notificationId, ownerId: userId },
        { $set: updateValues },
        { new: true }
    );
};