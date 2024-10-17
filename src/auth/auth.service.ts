import { CreateUserDto, UserDto } from "../user/user.schema";
import { jwtService } from "../util/jwt/jwt.service";
import { userService } from "../user/user.service";
import * as bcrypt from "bcrypt";
import { AppError } from "../error/error.types";
import { LoginDto } from "./auth.schema";
import { Repository } from "typeorm";
import { appDataSource } from "../db/data-source";
import { User } from "../db/entities/user.entity";

class AuthService {
  
  private userRepository: Repository<User> = appDataSource.getRepository(User);

  async register(data: CreateUserDto): Promise<void> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    await userService.create({ ...data, password: hashedPassword });
  }

  async login(data: LoginDto): Promise<string> {
    const user = await this.userRepository.findOneBy({email:data.email});
    if (!user) throw new AppError(404, "User not found");
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) throw new AppError(401, "Invalid password");
    const token = jwtService.generateToken({
      username: user.username,
      role: user.role,
    });
    return token;
  }

  async verifyToken(token: string): Promise<UserDto> {
    const payload = jwtService.verifyToken(token);
    const user = await userService.findByUsername(payload.username);
    if (!user) throw new AppError(401, "Unauthorized");
    return user;
  }
}

export const authService = new AuthService();
