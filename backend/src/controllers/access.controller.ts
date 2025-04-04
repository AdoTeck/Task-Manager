import { Request, Response } from "express";
import { accessService , getNotificationService, updateNotificationService} from "../services/access.service"

export const accessController = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const accessprojects = await accessService(userId!, req.body);
        res.status(200).json({ message: "Access request sent successfully", accessprojects });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
} 

export const getNotifiastionController = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const notificationData = await getNotificationService(userId!);
        res.status(200).json({ message: "Notification data fetched successfully", notificationData });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const updateNotifiastionController = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        // Extract notificationId from req.body and separate the update fields
        const { notificationId, ...updateData } = req.body;
        if (!notificationId) throw new Error("Notification ID is required");
        if (typeof notificationId !== "string") {
            throw new Error("Notification ID must be a string");
        }
        const notificationData = await updateNotificationService(userId!, notificationId, updateData);
        res.status(200).json({ message: "Notification data updated successfully", notificationData });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}