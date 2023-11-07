import { Request, Response, NextFunction } from "express";
import { searchService } from "./service";

export const searchController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payloadForBAP = searchService(req?.body);
    return res.status(200).send(payloadForBAP);
  } catch (error: any) {}
};
