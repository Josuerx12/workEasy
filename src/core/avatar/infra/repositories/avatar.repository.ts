import { db } from "@src/infra/dbConn";
import { IAvatarRepository } from "../../domain/contracts/avatarRepository.interface";
import { AvatarEntity } from "../../domain/entities/avatar.entity";
import { AvatarModelMapper } from "../models/avatar.model.mapper";

export class AvatarRepository implements IAvatarRepository {
  async getById(id: string): Promise<AvatarEntity> {
    const avatar = await db.avatar.findUnique({ where: { id } });

    return avatar ? AvatarModelMapper.toEntity(avatar) : null;
  }

  async getAll(): Promise<AvatarEntity[]> {
    const avatares = await db.avatar.findMany();

    return avatares
      ? avatares.map((Avatar) => AvatarModelMapper.toEntity(Avatar))
      : null;
  }

  async insert(entity: AvatarEntity): Promise<void> {
    await db.avatar.create({
      data: AvatarModelMapper.toModel(entity),
    });

    return;
  }

  async update(entity: AvatarEntity): Promise<void> {
    await db.avatar.update({
      where: { id: entity.id.value },
      data: AvatarModelMapper.toModel(entity),
    });

    return;
  }

  async delete(id: string): Promise<void> {
    await db.avatar.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
