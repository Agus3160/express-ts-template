import { z } from "zod";

export const uuidValidationSchema = z.object({ id: z.string().uuid() });
export const emailValidationSchema = z.object({ email: z.string().email() });