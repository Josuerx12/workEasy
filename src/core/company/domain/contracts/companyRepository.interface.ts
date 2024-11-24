import { BaseRepository } from "@src/core/shared/reporitory/baseRepository";
import { CompanyEntity } from "../entities/company.entity";
import { OutputParams } from "@src/core/shared/reporitory/outputParams";
import { InputParams } from "@src/core/shared/reporitory/inputParams";

export type CompanyFilter = {
  search?: string;
  uf?: string;
  city?: string;
};

export class CompanyInputParams extends InputParams<CompanyFilter> {}

export class CompanyOutputParams extends OutputParams<CompanyEntity> {}

export interface ICompanyRepository
  extends BaseRepository<
    CompanyEntity,
    CompanyInputParams,
    CompanyOutputParams
  > {
  getCompanyByDocumentEmailOrId(filter: string): Promise<CompanyEntity>;
}
