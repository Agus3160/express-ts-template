import { z } from "zod";
import { createUserSchema } from "../user/user.schema";

export const loginSchema = createUserSchema.omit({
  username: true,
  isEmailVerified: true,
});

export const loginResponseSchema = z.object({ token: z.string() });

export type LoginDto = z.infer<typeof loginSchema>;
export type LoginResponseDto = z.infer<typeof loginResponseSchema>;
