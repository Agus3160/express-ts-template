import { NextFunction, Request, Response } from "express";
import { generateReponse } from "../util/util";
import { CreateUserDto } from "./user.schema";
import { userService } from "./user.service";

class UserController {
  async hardDelete(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id as string;
    await userService.hardDelete(id);
    return generateReponse(res, {
      status: 200,
      success: true,
      data: null,
      message: "User deleted successfully",
    });
  }

  async softDelete(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id as string;
    await userService.softDelete(id);
    return generateReponse(res, {
      status: 200,
      success: true,
      data: null,
      message: "User deleted successfully",
    });
  }

  async findByEmail(req: Request, res: Response, next: NextFunction) {
    const email = req.params.email as string;
    const user = await userService.findByEmail(email);
    return generateReponse(res, {
      status: 200,
      success: true,
      message: "User found successfully",
      data: user,
    });
  }

  async findById(req: Request, res: Response) {
    const id = req.params.id as string;
    const user = await userService.findById(id);
    return generateReponse(res, {
      status: 200,
      success: true,
      message: "User found successfully",
      data: user,
    });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const userData = req.body as CreateUserDto;
    const newUser = await userService.create(userData);
    return generateReponse(res, {
      status: 201,
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  }

  async findByUsername(req: Request, res: Response, next: NextFunction) {
    const username = req.params.username as string;
    const user = await userService.findByUsername(username);
    return generateReponse(res, {
      status: 200,
      success: true,
      message: "User found successfully",
      data: user,
    });
  }
}

export const userController = new UserController();
