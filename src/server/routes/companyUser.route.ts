import { Router } from "express";
import { GetAllCompanyUserUseCase } from "src/core/companyUser/application/useCases/getAllCompanyUserUseCase";
import { GetCompanyUserUseCase } from "src/core/companyUser/application/useCases/getCompanyUserUseCase";
import { StoreCompanyUserUseCase } from "src/core/companyUser/application/useCases/storeCompanyUserUseCase";
import { UpdateCompanyUserUseCase } from "src/core/companyUser/application/useCases/updateCompanyUserUseCase";
import { CompanyUserRepository } from "src/core/companyUser/infra/repositories/companyUser.repository";
import upload from "src/middlewares/multerMiddleware";

export const companyUserRoutes = Router();

const companyUserRepository = new CompanyUserRepository();

companyUserRoutes.post("/", upload.single("avatar"), async (req, res) => {
  const storeUseCase = new StoreCompanyUserUseCase(companyUserRepository);

  const output = await storeUseCase.execute({ ...req.body, file: req.file });

  return res.status(201).json(output);
});

companyUserRoutes.put("/:id", upload.single("avatar"), async (req, res) => {
  const updateUseCase = new UpdateCompanyUserUseCase(companyUserRepository);

  const output = await updateUseCase.execute({
    id: req.params.id,
    ...req.body,
    file: req.file,
  });

  return res.status(201).json(output);
});

companyUserRoutes.get("/:id", async (req, res) => {
  const getUseCase = new GetCompanyUserUseCase(companyUserRepository);

  const output = await getUseCase.execute({ id: req.params.id });

  return res.status(200).json(output);
});

companyUserRoutes.get("/", async (req, res) => {
  const getAllUseCase = new GetAllCompanyUserUseCase(companyUserRepository);

  const output = await getAllUseCase.execute(req.params);

  return res.status(200).json(output);
});
