import { Prisma } from "@prisma/client";
import { TaskEntity } from "../../domain/entities/task.entity";
import { CompanyRequesterModelMapper } from "src/core/companyRequester/infra/models/companyRequester.model.mapper";
import { CompanyTaskCategoryModelMapper } from "src/core/companyTaskCategory/infra/models/companyTaskCategory.model.mapper";
import { CompanyUserModelMapper } from "src/core/companyUser/infra/models/companyUser.model.mapper";
import { EvidenceModelMapper } from "src/core/evidence/infra/models/evidence.model.mapper";

export class TaskModelMapper {
  static toModel(entity: TaskEntity): Prisma.taskCreateInput {
    return {
      id: entity.id.value,
      description: entity.description,
      title: entity.title,
      status: entity.status,
      companyRequester: {
        connect: {
          id: entity.companyRequesterId?.value,
        },
      },
      companyTaskCategory: {
        connect: {
          id: entity.companyTaskCategoryId?.value,
        },
      },
      companyUser: {
        connect: {
          id: entity.companyUserId?.value,
        },
      },
    };
  }

  static toEntity(model: any): TaskEntity {
    return new TaskEntity({
      id: model.id,
      companyRequesterId: model.companyRequesterId,
      companyTaskCategoryId: model.companyTaskCategoryId,
      companyUserId: model.companyUserId,
      description: model.description,
      companyRequester: model.companyRequester
        ? CompanyRequesterModelMapper.toEntity(model.companyRequester)
        : null,
      companyTaskCategory: model.companyTaskCategory
        ? CompanyTaskCategoryModelMapper.toEntity(model.companyTaskCategory)
        : null,

      companyUser: model.companyUser
        ? CompanyUserModelMapper.toEntity(model.companyUser)
        : null,
      evidences: model.evidences
        ? model.evidences.map((ev) => EvidenceModelMapper.toEntity(ev))
        : null,
      title: model.title,
      status: model.status,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    });
  }
}
