import { BaseRepository } from "@src/core/shared/reporitory/baseRepository";
import { CompanyTaskCategoryEntity } from "../entities/companyTaskCategory.entity";

export interface ICompanyTaskCategoryRepository
  extends BaseRepository<CompanyTaskCategoryEntity> {}
