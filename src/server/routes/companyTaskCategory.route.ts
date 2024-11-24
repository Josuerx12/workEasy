import { DeleteCompanyTaskCategoryUseCase } from "@src/core/companyTaskCategory/application/useCases/deleteCompanyTaskCategoryUseCase";
import { GetAllCompanyTaskCategoryUseCase } from "@src/core/companyTaskCategory/application/useCases/getAllCompanyTaskCategoryUseCase";
import { GetCompanyTaskCategoryUseCase } from "@src/core/companyTaskCategory/application/useCases/getCompanyTaskCategoryUseCase";
import { StoreCompanyTaskCategoryUseCase } from "@src/core/companyTaskCategory/application/useCases/storeCompanyTaskCategoryUseCase";
import { UpdateCompanyTaskCategoryUseCase } from "@src/core/companyTaskCategory/application/useCases/updateCompanyTaskCategoryUseCase";
import { CompanyTaskCategoryRepository } from "@src/core/companyTaskCategory/infra/repositories/companyTaskCategory.repository";
import { AuthGuard } from "@src/middlewares/authGuard";
import { Router } from "express";

export const companyTaskCategoryRoutes = Router();

const companyTaskCategoryRepository = new CompanyTaskCategoryRepository();

const authGuard = new AuthGuard();

companyTaskCategoryRoutes.post(
  "/",
  authGuard.authenticate,
  async (req, res) => {
    const storeUseCase = new StoreCompanyTaskCategoryUseCase(
      companyTaskCategoryRepository
    );

    const output = await storeUseCase.execute({
      ...req.body,
      companyId: req.user.companyUser.companyId,
    });

    return res.status(201).json(output);
  }
);

companyTaskCategoryRoutes.put(
  "/:id",
  authGuard.authenticate,
  async (req, res) => {
    const updateUseCase = new UpdateCompanyTaskCategoryUseCase(
      companyTaskCategoryRepository
    );

    const output = await updateUseCase.execute({
      id: req.params.id,
      ...req.body,
    });

    return res.status(201).json(output);
  }
);

companyTaskCategoryRoutes.get("/:id", async (req, res) => {
  const getUseCase = new GetCompanyTaskCategoryUseCase(
    companyTaskCategoryRepository
  );

  const output = await getUseCase.execute({ id: req.params.id });

  return res.status(200).json(output);
});

companyTaskCategoryRoutes.get("/", authGuard.authenticate, async (req, res) => {
  const getAllUseCase = new GetAllCompanyTaskCategoryUseCase(
    companyTaskCategoryRepository
  );

  const output = await getAllUseCase.execute({
    ...req.query,
    companyId: req.user.companyUser.companyId,
  });

  return res.status(200).json(output);
});

companyTaskCategoryRoutes.delete(
  "/:id",
  authGuard.authenticate,
  async (req, res) => {
    const deleteUseCase = new DeleteCompanyTaskCategoryUseCase(
      companyTaskCategoryRepository
    );

    const output = await deleteUseCase.execute({ id: req.params.id });

    return res.status(200).json(output);
  }
);
