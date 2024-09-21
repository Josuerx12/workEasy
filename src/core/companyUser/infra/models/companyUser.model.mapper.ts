import { Prisma } from "@prisma/client";
import { CompanyUserEntity } from "../../domain/entities/companyUser.entity";
import { CompanyModelMapper } from "src/core/company/infra/models/company.model.mapper";
import { AvatarModelMapper } from "src/core/avatar/infra/models/avatar.model.mapper";

export class CompanyUserModelMapper {
  static toModel(
    companyUser: CompanyUserEntity
  ): Prisma.companyUserUncheckedCreateInput {
    return {
      id: companyUser.id.value,
      avatarId: companyUser.avatarId?.value,
      companyId: companyUser.companyId.value,
      email: companyUser.email,
      name: companyUser.name,
      password: companyUser.password,
      document: companyUser.document,
      lat: companyUser.lat,
      long: companyUser.long,
      documentType: companyUser.documentType,
      phone: companyUser.phone,
    };
  }

  static toEntity(model: any): CompanyUserEntity {
    return new CompanyUserEntity({
      id: model.id,
      avatarId: model.avatarId,
      companyId: model.companyId,
      email: model.email,
      name: model.name,
      avatar: model.avatar ? AvatarModelMapper.toEntity(model.avatar) : null,
      document: model.document,
      documentType: model.documentType,
      phone: model.phone,
      lat: model.lat,
      long: model.long,
      company: model.company
        ? CompanyModelMapper.toEntity(model.company)
        : null,
      tasks: model.tasks,

      companyUserRoles: model.companyUserRoles,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    });
  }
}
