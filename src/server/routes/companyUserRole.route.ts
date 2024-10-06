import { Router } from "express";
import { DeleteCompanyUserRoleUseCase } from "src/core/companyUserRole/application/useCases/deleteCompanyUserRoleUseCase";
import { GetAllCompanyUserRoleUseCase } from "src/core/companyUserRole/application/useCases/getAllCompanyUserUseCase";
import { StoreCompanyUserRoleUseCase } from "src/core/companyUserRole/application/useCases/storeCompanyUserRoleUseCase";
import { CompanyUserRoleRepository } from "src/core/companyUserRole/infra/repositories/companyUserRole.repository";

export const companyUserRoleRoutes = Router();

const companyUserRoleRepository = new CompanyUserRoleRepository();

companyUserRoleRoutes.post("/", async (req, res) => {
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

companyUserRoleRoutes.delete("/:id", async (req, res) => {
  const deleteUseCase = new DeleteCompanyUserRoleUseCase(
    companyUserRoleRepository
  );

  const output = await deleteUseCase.execute(req.params);

  return res.status(200).json(output);
});
