import { Prisma } from "@prisma/client";
import { UserEntity } from "../../domain/entities/user.entity";
import { AvatarModelMapper } from "@src/core/avatar/infra/models/avatar.model.mapper";

export class UserModelMapper {
  static toModel(user: UserEntity): Prisma.userCreateInput {
    return {
      id: user.id.value,
      email: user.email,
      name: user.name,
      password: user.password,
      admin: user.admin,
      moderator: user.moderator,
      support: user.support,
      avatar: user.avatar && {
        connectOrCreate: {
          where: {
            id: user.avatarId.value,
          },
          create: AvatarModelMapper.toModel(user.avatar),
        },
      },
    };
  }

  static toEntity(model: any): UserEntity {
    return new UserEntity({
      id: model.id,
      email: model.email,
      name: model.name,
      admin: model.admin,
      avatar: model.avatar,
      avatarId: model.avatarId,
      moderator: model.moderator,
      support: model.support,
      company: model.company,
      companyRequester: model.companyRequester,
      companyUser: model.companyUser,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    });
  }
}
