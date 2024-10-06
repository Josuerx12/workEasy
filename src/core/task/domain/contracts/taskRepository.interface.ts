import { BaseRepository } from "src/core/shared/reporitory/baseRepository";
import { TaskEntity } from "../entities/task.entity";

export interface ITaskRepository extends BaseRepository<TaskEntity> {}
