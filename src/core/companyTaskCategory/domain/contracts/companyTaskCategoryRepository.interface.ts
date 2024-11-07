import { BaseRepository } from "@src/core/shared/reporitory/baseRepository";
import { CompanyTaskCategoryEntity } from "../entities/companyTaskCategory.entity";
import { OutputParams } from "@src/core/shared/reporitory/outputParams";

export interface GetAllCompanyTaskCategoryInputParams {
  perPage?: number;
  page?: number;
  filter?: string;
}

export class CompanyTaskCategoryOutputParams extends OutputParams<CompanyTaskCategoryEntity> {}

export interface ICompanyTaskCategoryRepository
  extends BaseRepository<
    CompanyTaskCategoryEntity,
    GetAllCompanyTaskCategoryInputParams,
    CompanyTaskCategoryOutputParams
  > {}
