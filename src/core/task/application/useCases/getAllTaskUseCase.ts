import { UseCase } from "@src/core/shared/useCase/useCase";
import {
  ITaskRepository,
  TaskInputParams,
} from "../../domain/contracts/taskRepository.interface";
import { TaskOutput, TaskOutputMapper } from "../shared/task.output";
import {
  PaginationOutput,
  PaginationOutputMapper,
} from "@src/core/shared/paginationOutput";

export type GetAllTaskInput = {
  page?: number;
  perPage?: number;
  filter?: string;
};

export class GetAllTaskUseCase
  implements UseCase<GetAllTaskInput, PaginationOutput<TaskOutput>>
{
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(input: GetAllTaskInput): Promise<PaginationOutput<TaskOutput>> {
    const index = await this.taskRepository.getAll(new TaskInputParams(input));

    const items = index.items.map((item) => TaskOutputMapper.toOutput(item));

    return PaginationOutputMapper.toOutput(items, index);
  }
}
