import { Router } from "express";
import { DeleteCompanyTaskCategoryUseCase } from "src/core/companyTaskCategory/application/useCases/deleteCompanyTaskCategoryUseCase";
import { GetAllCompanyTaskCategoryUseCase } from "src/core/companyTaskCategory/application/useCases/getAllCompanyTaskCategoryUseCase";
import { GetCompanyTaskCategoryUseCase } from "src/core/companyTaskCategory/application/useCases/getCompanyTaskCategoryUseCase";
import { StoreCompanyTaskCategoryUseCase } from "src/core/companyTaskCategory/application/useCases/storeCompanyTaskCategoryUseCase";
import { UpdateCompanyTaskCategoryUseCase } from "src/core/companyTaskCategory/application/useCases/updateCompanyTaskCategoryUseCase";
import { CompanyTaskCategoryRepository } from "src/core/companyTaskCategory/infra/repositories/companyTaskCategory.repository";

export const companyTaskCategoryRoutes = Router();

const companyTaskCategoryRepository = new CompanyTaskCategoryRepository();

companyTaskCategoryRoutes.post("/", async (req, res) => {
  const storeUseCase = new StoreCompanyTaskCategoryUseCase(
    companyTaskCategoryRepository
  );

  const output = await storeUseCase.execute(req.body);

  return res.status(201).json(output);
});

companyTaskCategoryRoutes.put("/:id", async (req, res) => {
  const updateUseCase = new UpdateCompanyTaskCategoryUseCase(
    companyTaskCategoryRepository
  );

  const output = await updateUseCase.execute({
    id: req.params.id,
    ...req.body,
  });

  return res.status(201).json(output);
});

companyTaskCategoryRoutes.get("/:id", async (req, res) => {
  const getUseCase = new GetCompanyTaskCategoryUseCase(
    companyTaskCategoryRepository
  );

  const output = await getUseCase.execute({ id: req.params.id });

  return res.status(200).json(output);
});

companyTaskCategoryRoutes.get("/", async (req, res) => {
  const getAllUseCase = new GetAllCompanyTaskCategoryUseCase(
    companyTaskCategoryRepository
  );

  const output = await getAllUseCase.execute(req.params);

  return res.status(200).json(output);
});

companyTaskCategoryRoutes.delete("/:id", async (req, res) => {
  const deleteUseCase = new DeleteCompanyTaskCategoryUseCase(
    companyTaskCategoryRepository
  );

  const output = await deleteUseCase.execute(req.params);

  return res.status(200).json(output);
});
