import { UseCase } from "@src/core/shared/useCase/useCase";
import { ITaskRepository } from "../../domain/contracts/taskRepository.interface";
import { TaskOutput, TaskOutputMapper } from "../shared/task.output";

export type GetTaskInput = {
  id: string;
};

export class GetTaskUseCase implements UseCase<GetTaskInput, TaskOutput> {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(input: GetTaskInput): Promise<TaskOutput> {
    const task = await this.taskRepository.getById(input.id);

    return TaskOutputMapper.toOutput(task);
  }
}
