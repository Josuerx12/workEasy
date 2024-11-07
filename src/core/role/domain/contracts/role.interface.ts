import { BaseRepository } from "@src/core/shared/reporitory/baseRepository";
import { RoleEntity } from "../entities/role.entity";
import { OutputParams } from "@src/core/shared/reporitory/outputParams";
import { InputParams } from "@src/core/shared/reporitory/inputParams";

export type RoleFilter = string;

export class RoleInputParams extends InputParams<RoleFilter> {}

export class RoleOutputParams extends OutputParams<RoleEntity> {}

export interface IRoleRepository
  extends BaseRepository<RoleEntity, RoleInputParams, RoleOutputParams> {}
