import { Prisma } from "@prisma/client";
import { IAuthRepository } from "../../domain/contracts/authRepository.interface";
import { db } from "@src/infra/dbConn";
import { UserEntity } from "@src/core/user/domain/entities/user.entity";
import { UserModelMapper } from "@src/core/user/infra/models/user.model.mapper";

export class AuthRepository implements IAuthRepository {
  async getUserByEmail(value: string): Promise<UserEntity> {
    const user = await db.user.findUnique({
      where: {
        email: value,
      },
      include: {
        company: true,
      },
    });

    return user ? UserModelMapper.toEntity(user) : null;
  }
}
