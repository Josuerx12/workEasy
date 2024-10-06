import { Prisma } from "@prisma/client";
import { EvidenceEntity } from "../../domain/entities/evidence.entity";

export class EvidenceModelMapper {
  static toModel(
    evidence: EvidenceEntity
  ): Prisma.evidenceUncheckedCreateInput {
    return {
      id: evidence.id.value,
      taskId: evidence.taskId.value,
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
