import { Prisma } from "@prisma/client";
import { CompanyUserEntity } from "../../domain/entities/companyUser.entity";
import { CompanyModelMapper } from "src/core/company/infra/models/company.model.mapper";
import { AvatarModelMapper } from "src/core/avatar/infra/models/avatar.model.mapper";
import { UserModelMapper } from "src/core/user/infra/models/user.model.mapper";
import { TaskModelMapper } from "src/core/task/infra/models/task.model.mapper";
import { CompanyUserRoleModelMapper } from "src/core/companyUserRole/infra/models/companyUserRole.model.mapper";

export class CompanyUserModelMapper {
  static toModel(
    companyUser: CompanyUserEntity
  ): Prisma.companyUserUncheckedCreateInput {
    return {
      id: companyUser.id.value,
      userId: companyUser.userId.value,
      companyId: companyUser.companyId.value,
      lat: companyUser.lat,
      long: companyUser.long,
    };
  }

  static toEntity(model: any): CompanyUserEntity {
    return new CompanyUserEntity({
      id: model.id,
      userId: model.userId,
      companyId: model.companyId,
      lat: model.lat,
      long: model.long,
      user: model.user ? UserModelMapper.toEntity(model.avatar) : null,
      company: model.company
        ? CompanyModelMapper.toEntity(model.company)
        : null,
      tasks: model.tasks
        ? model.tasks.map((task) => TaskModelMapper.toEntity(task))
        : null,
      companyUserRoles: model.companyUserRole
        ? model.companyUserRole.map((c) =>
            CompanyUserRoleModelMapper.toEntity(c)
          )
        : null,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    });
  }
}
