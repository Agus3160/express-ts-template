import { Request } from "express";
import { UserDto } from "./modules/user/user.schema";

declare global {
  declare namespace Express {
    export interface Request {
      user?: UserDto
    }
  }
}
