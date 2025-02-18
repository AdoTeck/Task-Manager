import { Request, Response } from "express";
import { accessService } from "../services/access.service"

export const accessController = async (req: Request, res: Response) => {
        try{
            const userId = req.user!.id;
            const projects = await accessService(userId); 
            res.status(200).json({message: "Access Given to the user",projects});
        }catch(error : any) {
            res.status(400).json({error: error.message});
        }    
} 