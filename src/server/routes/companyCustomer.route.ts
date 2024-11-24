import { GetAllCompanyCustomerUseCase } from "@src/core/companyCustomer/application/useCases/getAllCompanyCustomerUseCase";
import { GetCompanyCustomerUseCase } from "@src/core/companyCustomer/application/useCases/getCompanyCustomerUseCase";
import { StoreCompanyCustomerUseCase } from "@src/core/companyCustomer/application/useCases/storeCompanyCustomerUseCase";
import { UpdateCompanyCustomerUseCase } from "@src/core/companyCustomer/application/useCases/updateCompanyCustomerUseCase";
import { CompanyCustomerRepository } from "@src/core/companyCustomer/infra/repositories/companyCustomer.repository";
import { UserRepository } from "@src/core/user/infra/repositories/user.repository";
import { AuthGuard } from "@src/middlewares/authGuard";
import { Router } from "express";

export const companyCustomerRoutes = Router();

const companyCustomerRepository = new CompanyCustomerRepository();
const userRepository = new UserRepository();

const authGuard = new AuthGuard();

companyCustomerRoutes.post("/", authGuard.authenticate, async (req, res) => {
  const storeUseCase = new StoreCompanyCustomerUseCase(
    companyCustomerRepository
  );

  const output = await storeUseCase.execute({
    ...req.body,
    companyId: req.user.companyUser.companyId,
    file: req.file,
  });

  return res.status(201).json(output);
});

companyCustomerRoutes.put("/:id", authGuard.authenticate, async (req, res) => {
  const updateUseCase = new UpdateCompanyCustomerUseCase(
    companyCustomerRepository
  );

  const output = await updateUseCase.execute({
    id: req.params.id,
    ...req.body,
    file: req.file,
  });

  return res.status(201).json(output);
});

companyCustomerRoutes.get("/:id", async (req, res) => {
  const getUseCase = new GetCompanyCustomerUseCase(companyCustomerRepository);

  const output = await getUseCase.execute({ id: req.params.id });

  return res.status(200).json(output);
});

companyCustomerRoutes.get("/", authGuard.authenticate, async (req, res) => {
  const getAllUseCase = new GetAllCompanyCustomerUseCase(
    companyCustomerRepository
  );

  const output = await getAllUseCase.execute({
    ...req.query,
    companyId: req.user.companyUser.companyId,
  });

  return res.status(200).json(output);
});
