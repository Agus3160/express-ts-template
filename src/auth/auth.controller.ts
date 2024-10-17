import { Request, Response } from "express";
import { LoginDto } from "./auth.schema";
import { authService } from "./auth.service";
import { generateReponse } from "../util/util";

class AuthController {

  async login(req: Request, res: Response) {
    const loginData = req.body as LoginDto;
    const token = await authService.login(loginData);
    return generateReponse(res, {
      status: 200,
      success: true,
      message: "User logged in successfully",
      data: token
    })
  }

  async register(req: Request, res: Response) {
    const data = req.body;
    await authService.register(data);
    return generateReponse(res, {
      data: null,
      status: 200,
      success: true,
      message: "User registered successfully",
    })
  }

}

export const authController = new AuthController()