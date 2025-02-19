import { Request, Response } from "express";
import { accessService } from "../services/access.service"

export const accessController = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const accessprojects = await accessService(userId, req.body);
        res.status(200).json({ message: "Request Send to the user ", accessprojects });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
} 