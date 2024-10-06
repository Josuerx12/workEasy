import { UseCase } from "src/core/shared/useCase/useCase";
import { TaskOutput, TaskOutputMapper } from "../shared/task.output";
import { ITaskRepository } from "../../domain/contracts/taskRepository.interface";
import { TaskEntity } from "../../domain/entities/task.entity";

export type UpdateTaskInput = {
  id: string;

  status?: string;
  description?: string;
  title?: string;
  evidences: Express.Multer.File[];
};

export class UpdateTaskUseCase implements UseCase<UpdateTaskInput, TaskOutput> {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(input: UpdateTaskInput): Promise<TaskOutput> {
    const task = await this.taskRepository.getById(input.id);

    this.statusValidation(task, input.status);
    input.title && task.changeTitle(input.title);
    input.description && task.changeDescription(input.description);

    await this.taskRepository.update(task);

    return TaskOutputMapper.toOutput(task);
  }

  private statusValidation(task: TaskEntity, status?: string) {
    if (status === "canceled" && task.status != "created") {
      throw new Error("Tarefa não pode ser cancelada pois já foi iniciada.");
    }

    if (task.status != "created" && status === "created") {
      throw new Error("Status da tarefa não pode ser mudado para criado.");
    }

    if (task.status === "canceled") {
      throw new Error(
        "A tarefa não pode ser editada pois ela já foi cancelada."
      );
    }

    if (task.status === "finished") {
      throw new Error("A tarefa não pode ser editada pois já foi finalizada.");
    }

    if (status === "incoming" && task.status === "started") {
      throw new Error(
        "Tarefa já foi iniciada não é possivel alterar o status para à caminho."
      );
    }

    status && task.changeStatus(status);
  }
}
