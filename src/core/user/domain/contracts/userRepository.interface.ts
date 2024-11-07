import { BaseRepository } from "@src/core/shared/reporitory/baseRepository";
import { UserEntity } from "../entities/user.entity";
import { OutputParams } from "@src/core/shared/reporitory/outputParams";
import { InputParams } from "@src/core/shared/reporitory/inputParams";

export type UserFilter = string;

export class UserInputParams extends InputParams<UserFilter> {}

export class UserOutputParams extends OutputParams<UserEntity> {}

export interface IUserRepository
  extends BaseRepository<UserEntity, UserInputParams, UserOutputParams> {
  getByEmail(email: string): Promise<UserEntity>;
}
