import { BaseRepository } from "@src/core/shared/reporitory/baseRepository";
import { TaskEntity } from "../entities/task.entity";
import { OutputParams } from "@src/core/shared/reporitory/outputParams";
import { InputParams } from "@src/core/shared/reporitory/inputParams";

export type TaskFilter = string;

export class TaskInputParams extends InputParams<TaskFilter> {}

export class TaskOutputParams extends OutputParams<TaskEntity> {}

export interface ITaskRepository
  extends BaseRepository<TaskEntity, TaskInputParams, TaskOutputParams> {}
