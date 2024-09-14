import { db } from "src/infra/dbConn";
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

  insert(user: UserEntity): Promise<void> {
    db.user.create({
      data: UserModelMapper.toModel(user),
    });
    return;
  }

  update(user: UserEntity): Promise<void> {
    db.user.update({
      where: {
        id: user.id.value,
      },
      data: UserModelMapper.toModel(user),
    });
    return;
  }

  delete(id: string): Promise<void> {
    db.user.update({
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
