import { Prisma } from "@prisma/client";
import { CompanyUserModelMapper } from "@src/core/companyUser/infra/models/companyUser.model.mapper";
import { RoleModelMapper } from "@src/core/role/infra/models/role.model.mapper";
import { CompanyUserRoleEntity } from "../../domain/entities/companyUserRole.entity";

export class CompanyUserRoleModelMapper {
  static toModel(
    companyUserRole: CompanyUserRoleEntity
  ): Prisma.companyUserRoleCreateInput {
    return {
      id: companyUserRole.id.value,
      companyUser: {
        connectOrCreate: {
          where: {
            id: companyUserRole.companyUserId?.value,
          },
          create: CompanyUserModelMapper.toModel(companyUserRole.companyUser),
        },
      },
      role: {
        connectOrCreate: {
          where: {
            id: companyUserRole.roleId?.value,
          },
          create: RoleModelMapper.toModel(companyUserRole.role),
        },
      },
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
