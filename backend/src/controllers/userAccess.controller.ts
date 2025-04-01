import { Request, Response } from "express";
import { addUserService, getUserService } from "../services/userAccess.service";

export const addUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id; // Might be missing for Google users
        const email = req.user?.email; // Always available
        if (!userId && !email) {
             res.status(400).json({ error: "User identification missing" });
             return
        }

        const userData = await addUserService(userId || email!, req.body);
        res.status(200).json({ message: "User added successfully", userData });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const getUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        const email = req.user?.email;
        if (!userId && !email) {
             res.status(400).json({ error: "User identification missing" });
             return
        }
        const userData = await getUserService(userId || email!);
        res.status(200).json({ message: "User data fetched successfully", userData });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
