import { UserEntity } from "src/core/user/domain/entities/user.entity";
import { IAuthRepository } from "../../domain/contracts/authRepository.interface";
import { Prisma, PrismaClient } from "@prisma/client";
import { db } from "src/infra/dbConn";

export class AuthRepository implements IAuthRepository {
  async getUserByEmail(
    value: string
  ): Promise<Prisma.userUncheckedCreateInput> {
    const user = await db.user.findUnique({
      where: {
        email: value,
      },
    });

    return user;
  }
}
