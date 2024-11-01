import { LoginUseCase } from "@src/core/auth/application/useCases/loginUseCase";
import { AuthRepository } from "@src/core/auth/infra/repositories/auth.repository";
import { Router } from "express";

export const authRoutes = Router();

const authRepository = new AuthRepository();

authRoutes.post("/login", async (req, res) => {
  const storeUseCase = new LoginUseCase(authRepository);

  const output = await storeUseCase.execute(req.body);

  return res.status(201).json(output);
});
