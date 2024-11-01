import { Prisma } from "@prisma/client";
import { TaskModelMapper } from "@src/core/task/infra/models/task.model.mapper";
import { EvidenceEntity } from "../../domain/entities/evidence.entity";

export class EvidenceModelMapper {
  static toModel(evidence: EvidenceEntity): Prisma.evidenceCreateInput {
    return {
      id: evidence.id.value,
      task: {
        connectOrCreate: {
          where: {
            id: evidence.taskId?.value,
          },
          create: TaskModelMapper.toModel(evidence.task),
        },
      },
      path: evidence.path,
      url: evidence.url,
    };
  }

  static toEntity(model: any): EvidenceEntity {
    return new EvidenceEntity({
      id: model.id,
      taskId: model.taskId,
      path: model.path,
      url: model.url,
      task: model.task,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    });
  }
}
