import { CreateUserDto, UserDto, createUserSchema, readUserSchema } from "./user.schema";
import { User } from "../../db/entities/user.entity";
import { AppError } from "../../error/error.types";
import { parseSchema } from "../../util/util";
import { userRepository } from "../../db/repostitories";

export const userService = {
  async findById(id: string): Promise<UserDto> {
    const user = await userRepository.findOneBy({ id });
    if (!user) throw new AppError(404, "User not found");
    return parseSchema<UserDto>(readUserSchema, user);
  },

  async create(user: CreateUserDto): Promise<UserDto> {
    const newUserData = userRepository.create(user);
    if (!newUserData) throw new AppError(500, "Failed to create user");
    const userEntity = await userRepository.save(newUserData);
    if (!userEntity) throw new AppError(500, "Failed to create user");
    return parseSchema<UserDto>(readUserSchema, userEntity);
  },

  async findByEmail(email: string): Promise<UserDto> {
    const user = await userRepository.findOneBy({ email });
    if (!user) throw new AppError(404, "User not found");
    return parseSchema<UserDto>(readUserSchema, user);
  },

  async findByEmailWithPassword(email: string): Promise<User> {
    const user = await userRepository.findOneBy({ email });
    if (!user) throw new AppError(404, "User not found");
    return user;
  },

  async findByUsername(username: string): Promise<UserDto> {
    const user = await userRepository.findOneBy({ username });
    if (!user) throw new AppError(404, "User not found");
    return parseSchema<UserDto>(readUserSchema, user);
  },

  async softDelete(id: string): Promise<void> {
    await userRepository.update(id, { deletedAt: new Date() });
  },

  async hardDelete(id: string): Promise<void> {
    await userRepository.delete(id);
  },
};
