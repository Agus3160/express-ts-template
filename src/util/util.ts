import { NextFunction, Request, RequestHandler, Response } from "express";
import { ApiResponse } from "./definitions";
import { ZodSchema } from "zod";

export function parseSchema<T>(schema: ZodSchema, data: any): T {
  return schema.parse(data);
}

export const generateReponse = <T=null>(
  res: Response,
  value: ApiResponse<T>
) => {
  return res.status(200).json({
    status:value.status,
    success: value.success,
    message: value.message,
    data: value.data,
    errors: value.error,
  });
};
