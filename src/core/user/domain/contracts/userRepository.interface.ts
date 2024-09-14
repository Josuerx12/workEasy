import { UserEntity } from "../entities/user.entity";

export interface IUserRepository {
  getById(id: string): Promise<UserEntity>;
  getByEmail(email: string): Promise<UserEntity>;
  getAll(): Promise<UserEntity[]>;
  insert(user: UserEntity): Promise<void>;
  update(user: UserEntity): Promise<void>;
  delete(id: string): Promise<void>;
}
