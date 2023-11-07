import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export interface IRequestContext {
  domain: string;
  bppId?: string;
  bppUri?: string;
  transactionId: string;
  messageId: string;
  bapId?: string;
  bapUri?: string;
  key?: string;
}

export const requestContextSchema = Joi.object({
  domain: Joi.string().required(),
  bppId: Joi.string().optional(),
  bppUri: Joi.string().optional(),
  transactionId: Joi.string().optional(),
  messageId: Joi.string().optional(),
  key: Joi.string().optional()
});

export const requestSchema = Joi.object({
  context: requestContextSchema.required()
});

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = requestSchema.validate(req.body);
  if (error) {
    return res.status(400).send({
      message: "Invalid Request",
      data: error.message,
      success: false
    });
  }
  return next();
};
