import { CompanyOutput } from "src/core/company/application/shared/company.output";
import { CompanyTaskCategoryEntity } from "../../domain/entities/companyTaskCategory.entity";

export type CompanyTaskCategoryOutput = {
  id: string;
  companyId: string;
  title: string;
  description: string;

  task?: any[];
  company?: CompanyOutput;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class CompanyTaskCategoryOutputMapper {
  static toOutput(
    companyTaskCategoryEntity: CompanyTaskCategoryEntity
  ): CompanyTaskCategoryOutput {
    return companyTaskCategoryEntity.toJSON();
  }
}
