import { UserEntity } from "../../domain/entities/user.entity";

export type UserOutput = {
  id: string;
  avatarId?: string;
  name: string;
  email: string;
  password?: string;
  admin: boolean;
  moderator: boolean;
  support: boolean;
  avatar?: any;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class UserOutputMapper {
  static toOutput(userEntity: UserEntity): UserOutput {
    return userEntity ? userEntity.toJSON() : null;
  }
}
