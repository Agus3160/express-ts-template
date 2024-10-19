import { dataSource } from "./data-source";
import { User } from "./entities/user.entity";

export const userRepository = dataSource.getRepository(User)
