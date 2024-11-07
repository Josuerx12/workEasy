import { db } from "@src/infra/dbConn";
import {
  RoleInputParams,
  IRoleRepository,
  RoleOutputParams,
} from "../../domain/contracts/role.interface";
import { RoleEntity } from "../../domain/entities/role.entity";
import { RoleModelMapper } from "../models/role.model.mapper";

export class RoleRepository implements IRoleRepository {
  async getAll(props: RoleInputParams): Promise<RoleOutputParams> {
    const offset = (props.page - 1) * props.perPage;
    const limit = props.perPage;

    const roles = await db.role.findMany({
      skip: offset,
      take: limit,
    });
    const count = await db.role.count();

    const totalPages = Math.ceil(count / limit);

    return new RoleOutputParams({
      items: roles.map((role) => RoleModelMapper.toEntity(role)),
      currentPage: props.page,
      perPage: props.perPage,
      total: totalPages,
    });
  }
  async getById(id: string): Promise<RoleEntity> {
    const role = await db.role.findUnique({ where: { id } });

    return role ? RoleModelMapper.toEntity(role) : null;
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
