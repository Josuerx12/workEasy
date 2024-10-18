import { Prisma } from "@prisma/client";

export interface IAuthRepository {
  getUserByEmail(value: string): Promise<Prisma.userUncheckedCreateInput>;
}
