import { Prisma } from "@prisma/client";
import { CompanyUserRoleEntity } from "../../domain/entities/companyUserRole.entity";
import { CompanyUserModelMapper } from "src/core/companyUser/infra/models/companyUser.model.mapper";
import { RoleModelMapper } from "src/core/role/infra/models/role.model.mapper";

export class CompanyUserRoleModelMapper {
  static toModel(
    companyUserRole: CompanyUserRoleEntity
  ): Prisma.companyUserRoleUncheckedCreateInput {
    return {
      id: companyUserRole.id.value,
      companyUserId: companyUserRole.companyUserId.value,
      roleId: companyUserRole.roleId.value,
    };
  }

  static toEntity(model: any): CompanyUserRoleEntity {
    return new CompanyUserRoleEntity({
      id: model.id,
      roleId: model.roleId,
      companyUserId: model.companyUserId,
      companyUser: model.companyUser
        ? CompanyUserModelMapper.toEntity(model.companyUser)
        : null,
      role: model.role ? RoleModelMapper.toEntity(model.role) : null,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    });
  }
}
