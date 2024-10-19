import { CreateUserDto, UserDto, createUserSchema } from "./user.schema";
import { User } from "../db/entities/user.entity";
import { Repository } from "typeorm";
import { appDataSource } from "../db/data-source";
import { AppError } from "../error/error.types";
import { parseSchema } from "../util/util";

class UserService {
  private userRepository: Repository<User> = appDataSource.getRepository(User);

  async findById(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new AppError(404, "User not found");
    return parseSchema(createUserSchema, user);
  }

  async create(user: CreateUserDto): Promise<UserDto> {
    const newUserData = this.userRepository.create(user);
    if (!newUserData) throw new AppError(500, "Failed to create user");
    const userEntity = await this.userRepository.save(newUserData);
    if (!userEntity) throw new AppError(500, "Failed to create user");
    return parseSchema(createUserSchema, userEntity);
  }

  async findByEmail(email: string): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new AppError(404, "User not found");
    return parseSchema(createUserSchema, user);
  }

  async findByEmailWithPassword(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new AppError(404, "User not found");
    return user;
  }

  async findByUsername(username: string): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) throw new AppError(404, "User not found");
    return parseSchema(createUserSchema, user);
  }

  async softDelete(id: string): Promise<void> {
    await this.userRepository.update(id, { deletedAt: new Date() });
  }

  async hardDelete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}

export const userService = new UserService();
