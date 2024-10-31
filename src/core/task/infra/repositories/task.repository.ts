import { db } from "src/infra/dbConn";
import { ITaskRepository } from "../../domain/contracts/taskRepository.interface";
import { TaskEntity } from "../../domain/entities/task.entity";
import { TaskModelMapper } from "../models/task.model.mapper";
import { EvidenceEntity } from "src/core/evidence/domain/entities/evidence.entity";
import { EvidenceModelMapper } from "src/core/evidence/infra/models/evidence.model.mapper";

export class TaskRepository implements ITaskRepository {
  async getById(id: string): Promise<TaskEntity> {
    const task = await db.task.findUnique({ where: { id } });

    return task ? TaskModelMapper.toEntity(task) : null;
  }

  async getAll(): Promise<TaskEntity[]> {
    const tasks = await db.task.findMany();

    return tasks ? tasks.map((task) => TaskModelMapper.toEntity(task)) : null;
  }

  async insert(entity: TaskEntity): Promise<void> {
    await db.task.create({
      data: TaskModelMapper.toModel(entity),
    });

    entity.evidences && (await this.insertEvidences(entity.evidences));

    return;
  }

  async insertEvidences(entities: EvidenceEntity[]) {
    await db.evidence.createMany({
      data: entities.map((e) => EvidenceModelMapper.toModel(e)) as any,
    });
  }

  async update(entity: TaskEntity): Promise<void> {
    await db.task.update({
      where: { id: entity.id.value },
      data: TaskModelMapper.toModel(entity),
    });

    entity.evidences && (await this.insertEvidences(entity.evidences));

    return;
  }

  async delete(id: string): Promise<void> {
    await db.task.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
