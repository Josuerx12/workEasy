import { Prisma } from "@prisma/client";
import { CompanyModelMapper } from "@src/core/company/infra/models/company.model.mapper";
import { CompanyTaskCategoryEntity } from "../../domain/entities/companyTaskCategory.entity";

export class CompanyTaskCategoryModelMapper {
  static toModel(
    companyTaskCategory: CompanyTaskCategoryEntity
  ): Prisma.companyTaskCategoryCreateInput {
    return {
      id: companyTaskCategory.id.value,
      title: companyTaskCategory.title,
      description: companyTaskCategory.description,
      company: {
        connect: {
          id: companyTaskCategory.companyId.value,
        },
      },
    };
  }

  static toEntity(model: any): CompanyTaskCategoryEntity {
    return new CompanyTaskCategoryEntity({
      id: model.id,
      companyId: model.companyId,
      title: model.title,
      description: model.description,
      company: model.company
        ? CompanyModelMapper.toEntity(model.company)
        : null,
      task: model.task,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    });
  }
}
