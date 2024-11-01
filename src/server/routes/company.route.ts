import { GetAllCompanyUseCase } from "@src/core/company/application/useCases/getAllCompanyUseCase";
import { GetCompanyUseCase } from "@src/core/company/application/useCases/getCompanyUseCase";
import { StoreCompanyUseCase } from "@src/core/company/application/useCases/storeCompanyUseCase";
import { UpdateCompanyUseCase } from "@src/core/company/application/useCases/updateCompanyUseCase";
import { CompanyRepository } from "@src/core/company/infra/repositories/company.repository";
import { UserRepository } from "@src/core/user/infra/repositories/user.repository";
import { AuthGuard } from "@src/middlewares/authGuard";
import upload from "@src/middlewares/multerMiddleware";
import { Router } from "express";

export const companyRoutes = Router();

const companyRepository = new CompanyRepository();
const userRepository = new UserRepository();
const authGuard = new AuthGuard();

companyRoutes.post(
  "/",
  authGuard.authenticate,
  upload.single("avatar"),
  async (req, res) => {
    const storeUseCase = new StoreCompanyUseCase(
      companyRepository,
      userRepository
    );

    const output = await storeUseCase.execute({ ...req.body, file: req.file });

    return res.status(201).json(output);
  }
);

companyRoutes.put(
  "/:id",
  authGuard.authenticate,
  upload.single("avatar"),
  async (req, res) => {
    const updateUseCase = new UpdateCompanyUseCase(companyRepository);

    const output = await updateUseCase.execute({
      id: req.params.id,
      ...req.body,
      file: req.file,
    });

    return res.status(201).json(output);
  }
);

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
