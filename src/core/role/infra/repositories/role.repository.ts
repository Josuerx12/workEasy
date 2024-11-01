import { db } from "@src/infra/dbConn";
import { IRoleRepository } from "../../domain/contracts/role.interface";
import { RoleEntity } from "../../domain/entities/role.entity";
import { RoleModelMapper } from "../models/role.model.mapper";

export class RoleRepository implements IRoleRepository {
  async getById(id: string): Promise<RoleEntity> {
    const role = await db.role.findUnique({ where: { id } });

    return role ? RoleModelMapper.toEntity(role) : null;
  }

  async getAll(): Promise<RoleEntity[]> {
    const roles = await db.role.findMany();

    return roles ? roles.map((role) => RoleModelMapper.toEntity(role)) : null;
  }

  async insert(entity: RoleEntity): Promise<void> {
    await db.role.create({
      data: RoleModelMapper.toModel(entity),
    });

    return;
  }

  async update(entity: RoleEntity): Promise<void> {
    await db.role.update({
      where: { id: entity.id.value },
      data: RoleModelMapper.toModel(entity),
    });

    return;
  }

  async delete(id: string): Promise<void> {
    await db.role.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
