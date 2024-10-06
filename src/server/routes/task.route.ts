import { Router } from "express";
import { GetAllTaskUseCase } from "src/core/task/application/useCases/getAllTaskUseCase";
import { GetTaskUseCase } from "src/core/task/application/useCases/getTaskUseCase";
import { StoreTaskUseCase } from "src/core/task/application/useCases/storeTaskUseCase";
import { UpdateTaskUseCase } from "src/core/task/application/useCases/updateTaskUseCase";
import { TaskRepository } from "src/core/task/infra/repositories/task.repository";
import upload from "src/middlewares/multerMiddleware";

export const taskRoutes = Router();

const taskRepository = new TaskRepository();

taskRoutes.post("/", upload.array("evidences"), async (req, res) => {
  const storeUseCase = new StoreTaskUseCase(taskRepository);

  const output = await storeUseCase.execute({
    ...req.body,
    evidences: req.files,
  });

  return res.status(201).json(output);
});

taskRoutes.put("/:id", upload.array("evidences"), async (req, res) => {
  const updateUseCase = new UpdateTaskUseCase(taskRepository);

  const output = await updateUseCase.execute({
    id: req.params.id,
    ...req.body,
    evidences: req.files,
  });

  return res.status(201).json(output);
});

taskRoutes.get("/:id", async (req, res) => {
  const getUseCase = new GetTaskUseCase(taskRepository);

  const output = await getUseCase.execute({ id: req.params.id });

  return res.status(200).json(output);
});

taskRoutes.get("/", async (req, res) => {
  const getAllUseCase = new GetAllTaskUseCase(taskRepository);

  const output = await getAllUseCase.execute(req.params);

  return res.status(200).json(output);
});
