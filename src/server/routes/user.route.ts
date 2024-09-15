import { Router } from "express";
import { GetAllUsersUseCase } from "src/core/user/application/useCases/getAllUserUseCase";
import { GetUserUseCase } from "src/core/user/application/useCases/getUserUseCase";
import { StoreUserUseCase } from "src/core/user/application/useCases/storeUserUseCase";
import { UpdateUserUseCase } from "src/core/user/application/useCases/updateUserUseCase";
import { UserRepository } from "src/core/user/infra/repositories/user.repository";

export const userRoutes = Router();

const userRepository = new UserRepository();

userRoutes.post("/", async (req, res) => {
  const storeUseCase = new StoreUserUseCase(userRepository);

  const output = await storeUseCase.execute(req.body);

  return res.status(201).json(output);
});

userRoutes.put("/:id", async (req, res) => {
  const updateUseCase = new UpdateUserUseCase(userRepository);

  const output = await updateUseCase.execute({
    id: req.params.id,
    ...req.body,
  });

  return res.status(201).json(output);
});

userRoutes.get("/:id", async (req, res) => {
  const getUseCase = new GetUserUseCase(userRepository);

  const output = await getUseCase.execute({ id: req.params.id });

  return res.status(200).json(output);
});

userRoutes.get("/", async (req, res) => {
  const getAllUseCase = new GetAllUsersUseCase(userRepository);

  const output = await getAllUseCase.execute(req.params);

  return res.status(200).json(output);
});
