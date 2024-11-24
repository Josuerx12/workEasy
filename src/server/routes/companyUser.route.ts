import { GetAllCompanyUserUseCase } from "@src/core/companyUser/application/useCases/getAllCompanyUserUseCase";
import { GetCompanyUserUseCase } from "@src/core/companyUser/application/useCases/getCompanyUserUseCase";
import { StoreCompanyUserUseCase } from "@src/core/companyUser/application/useCases/storeCompanyUserUseCase";
import { UpdateCompanyUserUseCase } from "@src/core/companyUser/application/useCases/updateCompanyUserUseCase";
import { CompanyUserRepository } from "@src/core/companyUser/infra/repositories/companyUser.repository";
import { UserRepository } from "@src/core/user/infra/repositories/user.repository";
import { AuthGuard } from "@src/middlewares/authGuard";
import { Router } from "express";

export const companyUserRoutes = Router();

const companyUserRepository = new CompanyUserRepository();
const userRepository = new UserRepository();

const authGuard = new AuthGuard();

companyUserRoutes.post("/", authGuard.authenticate, async (req, res) => {
  const storeUseCase = new StoreCompanyUserUseCase(
    companyUserRepository,
    userRepository
  );

  const output = await storeUseCase.execute({
    ...req.body,
    companyId: req.user.companyUser.companyId,
  });

  return res.status(201).json(output);
});

companyUserRoutes.put("/:id", authGuard.authenticate, async (req, res) => {
  const updateUseCase = new UpdateCompanyUserUseCase(companyUserRepository);

  const output = await updateUseCase.execute({
    id: req.params.id,
    ...req.body,
  });

  return res.status(201).json(output);
});

companyUserRoutes.get("/:id", async (req, res) => {
  const getUseCase = new GetCompanyUserUseCase(companyUserRepository);

  const output = await getUseCase.execute({ id: req.params.id });

  return res.status(200).json(output);
});

companyUserRoutes.get("/", authGuard.authenticate, async (req, res) => {
  const getAllUseCase = new GetAllCompanyUserUseCase(companyUserRepository);

  const output = await getAllUseCase.execute(
    req.query,
    req.user.companyUser.companyId
  );

  return res.status(200).json(output);
});
