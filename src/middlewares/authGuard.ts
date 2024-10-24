import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { db } from "src/infra/dbConn";
import { UserModelMapper } from "src/core/user/infra/models/user.model.mapper";

export class AuthGuard {
  authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new Error("Nenhum token informado!");
    }

    verify(token, process.env.SECRET, async (err, decodedToken: any) => {
      if (err) {
        console.log(err);
        throw new Error("Token invalido!");
      } else {
        const user = await db.user.findUnique({
          where: { id: decodedToken.user.id },
          select: {
            company: true,
            admin: true,
            avatar: true,
            avatarId: true,
            companyRequester: true,
            companyUser: true,
            createdAt: true,
            deletedAt: true,
            email: true,
            id: true,
            moderator: true,
            name: true,
            support: true,
            updatedAt: true,
          },
        });

        console.log(user, decodedToken);

        const userEntity = UserModelMapper.toEntity(user);
        req.user = userEntity?.toJSON();

        next();
      }
    });
  }
}
