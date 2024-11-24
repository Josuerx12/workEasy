import { GetAllCompanyRequesterUseCase } from "@src/core/companyRequester/application/useCases/getAllCompanyRequesterUseCase";
import { GetCompanyRequesterUseCase } from "@src/core/companyRequester/application/useCases/getCompanyRequesterUseCase";
import { StoreCompanyRequesterUseCase } from "@src/core/companyRequester/application/useCases/storeCompanyRequesterUseCase";
import { UpdateCompanyRequesterUseCase } from "@src/core/companyRequester/application/useCases/updateCompanyRequesterUseCase";
import { CompanyRequesterRepository } from "@src/core/companyRequester/infra/repositories/companyRequester.repository";
import { UserRepository } from "@src/core/user/infra/repositories/user.repository";
import { AuthGuard } from "@src/middlewares/authGuard";
import upload from "@src/middlewares/multerMiddleware";
import { Router } from "express";

export const companyRequesterRoutes = Router();

const companyRequesterRepository = new CompanyRequesterRepository();
const userRepository = new UserRepository();

const authGuard = new AuthGuard();

companyRequesterRoutes.post(
  "/",
  authGuard.authenticate,
  upload.single("avatar"),
  async (req, res) => {
    const storeUseCase = new StoreCompanyRequesterUseCase(
      companyRequesterRepository,
      userRepository
    );

    const output = await storeUseCase.execute({
      ...req.body,
      companyId: req.user.companyUser.companyId,
      file: req.file,
    });

    return res.status(201).json(output);
  }
);

companyRequesterRoutes.put(
  "/:id",
  authGuard.authenticate,
  upload.single("avatar"),
  async (req, res) => {
    const updateUseCase = new UpdateCompanyRequesterUseCase(
      companyRequesterRepository
    );

    const output = await updateUseCase.execute({
      id: req.params.id,
      ...req.body,
      file: req.file,
    });

    return res.status(201).json(output);
  }
);

companyRequesterRoutes.get("/:id", async (req, res) => {
  const getUseCase = new GetCompanyRequesterUseCase(companyRequesterRepository);

  const output = await getUseCase.execute({ id: req.params.id });

  return res.status(200).json(output);
});

companyRequesterRoutes.get("/", authGuard.authenticate, async (req, res) => {
  const getAllUseCase = new GetAllCompanyRequesterUseCase(
    companyRequesterRepository
  );

  const output = await getAllUseCase.execute({
    ...req.query,
    companyId: req.user.companyUser.companyId,
  });

  return res.status(200).json(output);
});
