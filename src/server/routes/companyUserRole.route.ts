import { Router } from "express";
import { DeleteCompanyUserRoleUseCase } from "src/core/companyUserRole/application/useCases/deleteCompanyUserRoleUseCase";
import { GetAllCompanyUserRoleUseCase } from "src/core/companyUserRole/application/useCases/getAllCompanyUserUseCase";
import { StoreCompanyUserRoleUseCase } from "src/core/companyUserRole/application/useCases/storeCompanyUserRoleUseCase";
import { CompanyUserRoleRepository } from "src/core/companyUserRole/infra/repositories/companyUserRole.repository";
import { AuthGuard } from "src/middlewares/authGuard";

export const companyUserRoleRoutes = Router();

const companyUserRoleRepository = new CompanyUserRoleRepository();

const authGuard = new AuthGuard();

companyUserRoleRoutes.post("/", authGuard.authenticate, async (req, res) => {
  const storeUseCase = new StoreCompanyUserRoleUseCase(
    companyUserRoleRepository
  );

  const output = await storeUseCase.execute(req.body);

  return res.status(201).json(output);
});

companyUserRoleRoutes.get("/", async (req, res) => {
  const getAllUseCase = new GetAllCompanyUserRoleUseCase(
    companyUserRoleRepository
  );

  const output = await getAllUseCase.execute(req.params);

  return res.status(200).json(output);
});

companyUserRoleRoutes.delete(
  "/:id",
  authGuard.authenticate,
  async (req, res) => {
    const deleteUseCase = new DeleteCompanyUserRoleUseCase(
      companyUserRoleRepository
    );

    const output = await deleteUseCase.execute({ id: req.params.id });

    return res.status(200).json(output);
  }
);
