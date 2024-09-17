import { BaseRepository } from "src/core/shared/reporitory/baseRepository";
import { UserEntity } from "../entities/user.entity";

export interface IUserRepository extends BaseRepository<UserEntity> {
  getByEmail(email: string): Promise<UserEntity>;
}
