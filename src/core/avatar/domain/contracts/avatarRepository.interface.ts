import { BaseRepository } from "@src/core/shared/reporitory/baseRepository";
import { AvatarEntity } from "../entities/avatar.entity";

export interface IAvatarRepository extends BaseRepository<AvatarEntity> {}
