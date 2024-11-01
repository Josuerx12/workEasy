import { UseCase } from "@src/core/shared/useCase/useCase";
import { ITaskRepository } from "../../domain/contracts/taskRepository.interface";
import { TaskOutput, TaskOutputMapper } from "../shared/task.output";

export type GetAllTaskInput = {
  page?: number;
  perPage?: number;
  filter?: string;
};

export class GetAllTaskUseCase
  implements UseCase<GetAllTaskInput, TaskOutput[]>
{
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(input: GetAllTaskInput): Promise<TaskOutput[]> {
    const tasks = await this.taskRepository.getAll();

    return tasks.map((task) => TaskOutputMapper.toOutput(task));
  }
}
