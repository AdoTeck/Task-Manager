import { Request, Response } from "express";
import { addUserService, getUserService } from "../services/userAccess.service";

export const addUserController = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const userData = await addUserService(userId, req.body);
        res.status(200).json({ message: "User Added successfully", userData });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const getUserController = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const userData = await getUserService(userId);
        res.status(200).json({ message: "User data fetched successfully", userData });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
