import { Request } from "express";
import { UserDto } from "./user/user.schema";

declare global {
  declare namespace Express {
    export interface Request {
      user?: UserDto
    }
  }
}
