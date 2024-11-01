import { AvatarEntity } from "@src/core/avatar/domain/entities/avatar.entity";
import { AvatarModelMapper } from "@src/core/avatar/infra/models/avatar.model.mapper";
import { db } from "@src/infra/dbConn";
import { IUserRepository } from "../../domain/contracts/userRepository.interface";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserModelMapper } from "../models/user.model.mapper";

export class UserRepository implements IUserRepository {
  async getById(id: string): Promise<UserEntity> {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return user ? UserModelMapper.toEntity(user) : null;
  }

  async getByEmail(email: string): Promise<UserEntity> {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user ? UserModelMapper.toEntity(user) : null;
  }

  async getAll(): Promise<UserEntity[]> {
    const allUsers = await db.user.findMany();

    return allUsers
      ? allUsers.map((user) => UserModelMapper.toEntity(user))
      : null;
  }

  async insert(user: UserEntity): Promise<void> {
    await db.user.create({
      data: UserModelMapper.toModel(user),
    });

    if (user.avatar) {
      await this.insertAvatar(user.avatar);
    }
  }

  async insertAvatar(avatar: AvatarEntity): Promise<void> {
    await db.avatar.create({
      data: AvatarModelMapper.toModel(avatar),
    });
  }

  async update(user: UserEntity): Promise<void> {
    await db.user.update({
      where: {
        id: user.id.value,
      },
      data: UserModelMapper.toModel(user),
    });
    return;
  }

  async delete(id: string): Promise<void> {
    await db.user.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return;
  }
}
