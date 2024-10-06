import { Prisma } from "@prisma/client";
import { CompanyModelMapper } from "src/core/company/infra/models/company.model.mapper";
import { AvatarModelMapper } from "src/core/avatar/infra/models/avatar.model.mapper";
import { CompanyRequesterEntity } from "../../domain/entities/companyRequester.entity";

export class CompanyRequesterModelMapper {
  static toModel(
    companyRequester: CompanyRequesterEntity
  ): Prisma.companyRequesterUncheckedCreateInput {
    return {
      id: companyRequester.id.value,
      avatarId: companyRequester.avatarId?.value,
      companyId: companyRequester.companyId.value,
      email: companyRequester.email,
      name: companyRequester.name,
      password: companyRequester.password,
      phone: companyRequester.phone,
    };
  }

  static toEntity(model: any): CompanyRequesterEntity {
    return new CompanyRequesterEntity({
      id: model.id,
      avatarId: model.avatarId,
      companyId: model.companyId,
      email: model.email,
      name: model.name,
      phone: model.phone,
      company: model.company
        ? CompanyModelMapper.toEntity(model.company)
        : null,
      tasks: model.tasks,
      avatar: model.avatar ? AvatarModelMapper.toEntity(model.avatar) : null,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    });
  }
}
