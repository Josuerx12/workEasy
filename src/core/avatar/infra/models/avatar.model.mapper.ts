import { Prisma } from "@prisma/client";
import { CompanyModelMapper } from "@src/core/company/infra/models/company.model.mapper";
import { UserModelMapper } from "@src/core/user/infra/models/user.model.mapper";
import { AvatarEntity } from "../../domain/entities/avatar.entity";

export class AvatarModelMapper {
  static toModel(avatar: AvatarEntity): Prisma.avatarCreateInput {
    return {
      id: avatar.id.value,
      path: avatar.path,
      url: avatar.url,
    };
  }

  static toEntity(model: any): AvatarEntity {
    return new AvatarEntity({
      id: model.id,
      path: model.path,
      url: model.url,
      user: model.user
        ? model.user.map((user) => UserModelMapper.toEntity(user))
        : null,
      company: model.company
        ? model.company.map((company) => CompanyModelMapper.toEntity(company))
        : null,
      companyRequester: model.companyRequester,
      companyUser: model.companyUser,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    });
  }
}
