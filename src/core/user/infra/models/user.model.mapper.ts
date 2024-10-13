import { Prisma } from "@prisma/client";
import { UserEntity } from "../../domain/entities/user.entity";

export class UserModelMapper {
  static toModel(user: UserEntity): Prisma.userUncheckedCreateInput {
    return {
      id: user.id.value,
      avatarId: user.avatarId?.value,
      email: user.email,
      name: user.name,
      password: user.password,
      admin: user.admin,
      moderator: user.moderator,
      support: user.support,
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
