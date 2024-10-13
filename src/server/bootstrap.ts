import "express-async-errors";
import express from "express";
import cors from "cors";
import { routes } from "./router";
import { errorHandler } from "src/middlewares/errorHandler";
import rateLimit from "express-rate-limit";

export class Bootstrap {
  private app: express.Application;
  private port: string | number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT ? process.env.PORT : 3000;

    const limiter = rateLimit({
      windowMs: 10 * 60 * 1000,
      max: 100,
      message:
        "Muitas requisições sendo executadas do mesmo endereço de ip, Tente novamente mais tarde!",
    });

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(routes);
    this.app.use(cors());
    this.app.use(errorHandler);
    this.app.use(limiter);
  }

  start() {
    this.app.listen(this.port, () =>
      console.log(
        `Servidor rodando localmente em http://localhost:${this.port}`
      )
    );
  }
}
