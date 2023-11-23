import { Request, Response, NextFunction } from "express";
import { selectService } from "./service";

export const selectController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const payloadForBAP = await selectService(req?.body);
        return res.status(200).send(payloadForBAP);
    } catch (error: any) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
