import { Response } from "express";
import { ApiResponse } from "./definitions";
import { ZodSchema } from "zod";

export function parseSchema<T>(schema: ZodSchema<T>, data: any): T {
  return schema.parse(data);
}

export const generateReponse = <T = null>(
  res: Response,
  value: ApiResponse<T>,
  schema?: ZodSchema<T>
) => {
  const data = schema ? parseSchema(schema, value.data) : value.data;
  return res.status(200).json({
    status: value.status,
    success: value.success,
    message: value.message,
    data: data,
    errors: value.error,
  });
};
