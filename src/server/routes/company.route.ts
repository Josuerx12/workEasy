import { Router } from "express";
import { GetAllCompanyUseCase } from "src/core/company/application/useCases/getAllCompanyUseCase";
import { GetCompanyUseCase } from "src/core/company/application/useCases/getCompanyUseCase";
import { StoreCompanyUseCase } from "src/core/company/application/useCases/storeCompanyUseCase";
import { UpdateCompanyUseCase } from "src/core/company/application/useCases/updateCompanyUseCase";
import { CompanyRepository } from "src/core/company/infra/repositories/company.repository";

export const companyRoutes = Router();

const companyRepository = new CompanyRepository();

companyRoutes.post("/", async (req, res) => {
  const storeUseCase = new StoreCompanyUseCase(companyRepository);

  const output = await storeUseCase.execute(req.body);

  return res.status(201).json(output);
});

companyRoutes.put("/:id", async (req, res) => {
  const updateUseCase = new UpdateCompanyUseCase(companyRepository);

  const output = await updateUseCase.execute({
    id: req.params.id,
    ...req.body,
  });

  return res.status(201).json(output);
});

companyRoutes.get("/:id", async (req, res) => {
  const getUseCase = new GetCompanyUseCase(companyRepository);

  const output = await getUseCase.execute({ id: req.params.id });

  return res.status(200).json(output);
});

companyRoutes.get("/", async (req, res) => {
  const getAllUseCase = new GetAllCompanyUseCase(companyRepository);

  const output = await getAllUseCase.execute(req.params);

  return res.status(200).json(output);
});
