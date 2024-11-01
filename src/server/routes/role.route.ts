import { GetAllRoleUseCase } from "@src/core/role/application/useCases/getAllRoleUseCase";
import { GetRoleUseCase } from "@src/core/role/application/useCases/getRoleUseCase";
import { StoreRoleUseCase } from "@src/core/role/application/useCases/storeRoleUseCase";
import { UpdateRoleUseCase } from "@src/core/role/application/useCases/updateRoleUseCase";
import { RoleRepository } from "@src/core/role/infra/repositories/role.repository";
import { AuthGuard } from "@src/middlewares/authGuard";
import { Router } from "express";

export const roleRoutes = Router();

const roleRepository = new RoleRepository();

const authGuard = new AuthGuard();

roleRoutes.post("/", authGuard.authenticate, async (req, res) => {
  const storeUseCase = new StoreRoleUseCase(roleRepository);

  const output = await storeUseCase.execute(req.body);

  return res.status(201).json(output);
});

roleRoutes.put("/:id", authGuard.authenticate, async (req, res) => {
  const updateUseCase = new UpdateRoleUseCase(roleRepository);

  const output = await updateUseCase.execute({
    id: req.params.id,
    ...req.body,
  });

  return res.status(201).json(output);
});

roleRoutes.get("/:id", async (req, res) => {
  const getUseCase = new GetRoleUseCase(roleRepository);

  const output = await getUseCase.execute({ id: req.params.id });

  return res.status(200).json(output);
});

roleRoutes.get("/", async (req, res) => {
  const getAllUseCase = new GetAllRoleUseCase(roleRepository);

  const output = await getAllUseCase.execute(req.params);

  return res.status(200).json(output);
});
