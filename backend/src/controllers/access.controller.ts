import { Request, Response } from "express";
import { accessService , getNotificationData} from "../services/access.service"

export const accessController = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const accessprojects = await accessService(userId, req.body);
        res.status(200).json({ message: "Access request sent successfully", accessprojects });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
} 

export const getNotifiastionData = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const notificationData = await getNotificationData(userId);
        res.status(200).json({ message: "Notification data fetched successfully", notificationData });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}