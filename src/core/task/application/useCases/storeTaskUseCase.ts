import { UseCase } from "@src/core/shared/useCase/useCase";
import { ITaskRepository } from "../../domain/contracts/taskRepository.interface";
import { TaskEntity } from "../../domain/entities/task.entity";
import { TaskOutput, TaskOutputMapper } from "../shared/task.output";

export type StoreTaskInput = {
  companyRequesterId: string;
  companyTaskCategoryId: string;
  title: string;
  status: string;
  description: string;
};

export class StoreTaskUseCase implements UseCase<StoreTaskInput, TaskOutput> {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(input: StoreTaskInput): Promise<TaskOutput> {
    const task = new TaskEntity(input);

    await this.taskRepository.insert(task);

    return TaskOutputMapper.toOutput(task);
  }
}
