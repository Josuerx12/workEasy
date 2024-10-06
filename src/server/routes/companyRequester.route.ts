import { Router } from "express";
import { GetAllCompanyRequesterUseCase } from "src/core/companyRequester/application/useCases/getAllCompanyRequesterUseCase";
import { GetCompanyRequesterUseCase } from "src/core/companyRequester/application/useCases/getCompanyRequesterUseCase";
import { StoreCompanyRequesterUseCase } from "src/core/companyRequester/application/useCases/storeCompanyRequesterUseCase";
import { UpdateCompanyRequesterUseCase } from "src/core/companyRequester/application/useCases/updateCompanyRequesterUseCase";
import { CompanyRequesterRepository } from "src/core/companyRequester/infra/repositories/companyRequester.repository";
import upload from "src/middlewares/multerMiddleware";

export const companyRequesterRoutes = Router();

const companyRequesterRepository = new CompanyRequesterRepository();

companyRequesterRoutes.post("/", upload.single("avatar"), async (req, res) => {
  const storeUseCase = new StoreCompanyRequesterUseCase(
    companyRequesterRepository
  );

  const output = await storeUseCase.execute({ ...req.body, file: req.file });

  return res.status(201).json(output);
});

companyRequesterRoutes.put(
  "/:id",
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

companyRequesterRoutes.get("/", async (req, res) => {
  const getAllUseCase = new GetAllCompanyRequesterUseCase(
    companyRequesterRepository
  );

  const output = await getAllUseCase.execute(req.params);

  return res.status(200).json(output);
});
