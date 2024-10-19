import { z } from "zod";
import { baseSchema } from "../../util/base/schema";
import { roles } from "../../db/entities/user.entity";

export const createUserSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 8 characters"),
  email: z.string().email("Invalid email"),
  isEmailVerified: z.boolean().default(false),
  role: z.enum(roles).default("user"),
})

export const userSchema = baseSchema.merge(z.object({
  username: z.string(),
  password: z.string(),
  email: z.string(),
  isEmailVerified: z.boolean(),
  role: z.enum(roles),
}))

export const readUserSchema = userSchema.omit({password: true});

export type CreateUserDto = z.infer<typeof createUserSchema>
export type UserDto = z.infer<typeof readUserSchema>