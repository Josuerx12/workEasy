import "express-async-errors";
import express from "express";
import { routes } from "./router";
import rateLimit from "express-rate-limit";
import cors from "cors";
import { errorHandler } from "@src/middlewares/errorHandler";

export class Bootstrap {
  app: express.Application;
  private port: string | number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT ? process.env.PORT : 3000;

    const limiter = rateLimit({
      windowMs: 10 * 60 * 1000, // 10 minutos
      max: 100, // Limite de requisições
      message: "Muitas requisições do mesmo IP. Tente novamente mais tarde!",
    });

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(
      cors({
        origin: [
          "http://localhost:5173",
          "https://seu-dominio-de-producao.com",
        ], // Origem permitida
        methods: "GET,POST,PUT,DELETE,OPTIONS", // Métodos permitidos
        allowedHeaders: "Content-Type,Authorization", // Cabeçalhos permitidos
        exposedHeaders: "Authorization", // Cabeçalhos expostos
        preflightContinue: false, // Não continuar após preflight
        optionsSuccessStatus: 204, // Retornar 204 para preflight bem-sucedido
      })
    );
    this.app.use(routes);
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
