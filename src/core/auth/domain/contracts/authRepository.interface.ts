import { Prisma } from "@prisma/client";
import { UserOutput } from "@src/core/user/application/shared/user.output";
import { UserEntity } from "@src/core/user/domain/entities/user.entity";

export interface IAuthRepository {
  getUserByEmail(value: string): Promise<UserEntity>;
}
