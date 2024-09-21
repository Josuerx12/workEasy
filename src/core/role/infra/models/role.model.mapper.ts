import { Prisma } from "@prisma/client";
import { UserModelMapper } from "src/core/user/infra/models/user.model.mapper";
import { CompanyModelMapper } from "src/core/company/infra/models/company.model.mapper";
import { RoleEntity } from "../../domain/entities/role.entity";

export class RoleModelMapper {
  static toModel(role: RoleEntity): Prisma.roleUncheckedCreateInput {
    return {
      id: role.id.value,
      description: role.description,
      name: role.name,
    };
  }

  static toEntity(model: any): RoleEntity {
    return new RoleEntity({
      id: model.id,
      name: model.name,
      description: model.description,
      companyUserRole: model.companyUserRole,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    });
  }
}
