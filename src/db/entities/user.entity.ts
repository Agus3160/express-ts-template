import { Column, Entity } from "typeorm";
import { BaseEntityUtil } from "../../util/base/entity";

export const roles = ['admin', 'user', 'super_admin'] as const;

export type Role = typeof roles[number];

@Entity()
export class User extends BaseEntityUtil {

  @Column({unique: true})
  username: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column({type:"boolean", default: false})
  isEmailVerified: boolean;

  @Column({type: "enum", enum: roles, default: "user"})
  role: Role;

}