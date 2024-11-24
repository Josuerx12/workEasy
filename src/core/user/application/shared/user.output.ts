import { CompanyUserOutput } from "@src/core/companyUser/application/shared/companyUser.output";
import { UserEntity } from "../../domain/entities/user.entity";
import { CompanyUserRoleOutput } from "@src/core/companyUserRole/application/shared/companyUserRole.output";

export type UserOutput = {
  id: string;
  avatarId?: string;
  name: string;
  email: string;
  password?: string;
  admin: boolean;
  moderator: boolean;
  companyUser: CompanyUserOutput;
  companyUserRoles: CompanyUserRoleOutput[];
  tasks: any[];
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
