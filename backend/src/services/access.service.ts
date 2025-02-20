import { User } from "../models/user.models";
import { AccessRequest } from "../models/accessRequest.models";
import { getIo } from "../utils/sockets/socket";
interface UserData {
    refecode: string;
}

export const accessService = async (userId: string, userData: UserData) => {
    const { refecode } = userData;

    // Find the Owner by refecode
    const owner = await User.findOne({ refecode }).select('_id fullName') as { _id: string, fullName: string } | null;
    if (!owner) {
        throw new Error("User not found for the provided refecode.");
    }

    // Check if an existing pending request exists in history
    const existingRequest = await AccessRequest.findOne({
        "history.requesterId": userId,
        "history.ownerId": owner._id,
        "history.status": "pending"
    });

    if (existingRequest) {
        throw new Error("Access request is already pending.");
    }

    // Push a new request into history
    const accessRecord = await AccessRequest.findOneAndUpdate(
        { 
            $push: { 
                history: { 
                    requesterId: userId, 
                    ownerId: owner._id, 
                    status: "pending", 
                    createdAt: new Date()
                } 
            } 
        },
        { upsert: true, new: true }
    );

    getIo().to(owner._id.toString()).emit("access_request", {
        message: "New access request received",
        request: accessRecord
    });

    return {
        message: "Access request sent successfully",
        request: accessRecord,
        notifyOwner: {
            userId: owner._id,
            fullName: owner.fullName,
            notification: `User ${userId} has requested access.`
        }
    };
};
