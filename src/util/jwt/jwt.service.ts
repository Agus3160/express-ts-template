import * as jwt from "jsonwebtoken";
import { env } from "../../config/env";
import { CustomPayload } from "./jwt.type";

const { secret, expirationTime } = env;

export class JwtService {
  
  generateToken(payload: CustomPayload): string {
    return jwt.sign(payload, secret, {
      expiresIn: expirationTime,
    });
  }

  verifyToken(token: string): CustomPayload {
    return jwt.verify(token, secret) as CustomPayload;
  }
  
}

export const jwtService = new JwtService();