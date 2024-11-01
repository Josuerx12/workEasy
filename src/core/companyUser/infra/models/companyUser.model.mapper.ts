import { Prisma } from "@prisma/client";
import { CompanyModelMapper } from "@src/core/company/infra/models/company.model.mapper";
import { CompanyUserRoleModelMapper } from "@src/core/companyUserRole/infra/models/companyUserRole.model.mapper";
import { TaskModelMapper } from "@src/core/task/infra/models/task.model.mapper";
import { UserModelMapper } from "@src/core/user/infra/models/user.model.mapper";
import { CompanyUserEntity } from "../../domain/entities/companyUser.entity";

export class CompanyUserModelMapper {
  static toModel(
    companyUser: CompanyUserEntity
  ): Prisma.companyUserCreateInput {
    return {
      id: companyUser.id.value,
      lat: companyUser.lat,
      long: companyUser.long,
      user: companyUser.user
        ? {
            connectOrCreate: {
              where: {
                id: companyUser.userId?.value,
              },
              create: {
                id: companyUser.user.id.value,
                email: companyUser.user.email,
                name: companyUser.user.name,
                password: companyUser.user.password,
              },
            },
          }
        : undefined,
      company: {
        connect: {
          id: companyUser.companyId?.value,
        },
      },
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
