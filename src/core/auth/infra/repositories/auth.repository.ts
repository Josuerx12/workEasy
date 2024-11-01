import { Prisma } from "@prisma/client";
import { IAuthRepository } from "../../domain/contracts/authRepository.interface";
import { db } from "@src/infra/dbConn";

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
