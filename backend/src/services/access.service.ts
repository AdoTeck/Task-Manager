import { User } from "../models/user.models";

interface UserData {
    refecode: string;
}

export const accessService = async (userId: string, userData: UserData) => {
    const { refecode } = userData;
    const user = await User.findOne({ refecode }).select('_id fullName');
    if (!user) {
        throw new Error("User not found for the provided refecode.");
    }
    return user;
};