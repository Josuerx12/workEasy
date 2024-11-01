import {
  CompanyUserOutput,
  CompanyUserOutputMapper,
} from "@src/core/companyUser/application/shared/companyUser.output";
import {
  RoleOutput,
  RoleOutputMapper,
} from "@src/core/role/application/shared/role.output";
import { CompanyUserRoleEntity } from "../../domain/entities/companyUserRole.entity";

export type CompanyUserRoleOutput = {
  id: string;
  companyUserId: string;
  roleId: string;

  companyUser?: CompanyUserOutput;
  role?: RoleOutput;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class CompanyUserRoleOutputMapper {
  static toOutput(
    companyUserRoleEntity: CompanyUserRoleEntity
  ): CompanyUserRoleOutput {
    return companyUserRoleEntity
      ? {
          ...companyUserRoleEntity.toJSON(),
          companyUser: companyUserRoleEntity.companyUser
            ? CompanyUserOutputMapper.toOutput(
                companyUserRoleEntity.companyUser
              )
            : null,
          role: companyUserRoleEntity.role
            ? RoleOutputMapper.toOutput(companyUserRoleEntity.role)
            : null,
        }
      : null;
  }
}
