import { Entity } from "@src/core/shared/entity/entity";
import { Uuid } from "@src/core/shared/valueObjects/uuid.vo";
import { TaskEntity } from "@src/core/task/domain/entities/task.entity";

export type EvidenceEntityProps = {
  id?: string;
  taskId: string;
  path: string;
  url: string;

  task: TaskEntity;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class EvidenceEntity extends Entity {
  id: Uuid;
  taskId: Uuid;
  path: string;
  url: string;

  task: TaskEntity;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  constructor(props: EvidenceEntityProps) {
    super();

    this.id = new Uuid(props.id);
    this.taskId = new Uuid(props.taskId);
    this.path = props.path;
    this.url = props.url;
    this.task = props.task;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }

  toJSON() {
    return {
      id: this.id.value,
      taskId: this.taskId.value,
      path: this.path,
      url: this.url,
      task: this.task?.toJSON(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
  validate() {}
}
