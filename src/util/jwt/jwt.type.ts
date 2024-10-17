import { JwtPayload } from "jsonwebtoken"
import { Role } from "../../db/entities/user.entity";

export type CustomPayload = {
  username: string
  role:Role
};

export type Payload = JwtPayload & CustomPayload;