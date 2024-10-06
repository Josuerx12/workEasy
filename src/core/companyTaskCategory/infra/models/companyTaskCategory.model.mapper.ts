import { Prisma } from "@prisma/client";
import { CompanyTaskCategoryEntity } from "../../domain/entities/companyTaskCategory.entity";
import { CompanyModelMapper } from "src/core/company/infra/models/company.model.mapper";

export class CompanyTaskCategoryModelMapper {
  static toModel(
    companyTaskCategory: CompanyTaskCategoryEntity
  ): Prisma.companyTaskCategoryUncheckedCreateInput {
    return {
      id: companyTaskCategory.id.value,
      companyId: companyTaskCategory.companyId.value,
      title: companyTaskCategory.title,
      description: companyTaskCategory.description,
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
