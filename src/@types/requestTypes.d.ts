import * as express from "express";
import { UserOutput } from "src/core/user/application/shared/user.output";

declare global {
  namespace Express {
    interface Request {
      companyId: string;
      user: UserOutput;
    }
  }
}
