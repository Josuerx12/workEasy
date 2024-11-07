import { BaseRepository } from "@src/core/shared/reporitory/baseRepository";
import { CompanyUserEntity } from "../entities/companyUser.entity";
import { OutputParams } from "@src/core/shared/reporitory/outputParams";
import { InputParams } from "@src/core/shared/reporitory/inputParams";

export type CompanyUserFilter = string;

export class CompanyUserInputParams extends InputParams<CompanyUserFilter> {}

export class CompanyUserOutputParams extends OutputParams<CompanyUserEntity> {}

export interface ICompanyUserRepository
  extends BaseRepository<
    CompanyUserEntity,
    CompanyUserInputParams,
    CompanyUserOutputParams
  > {
  getCompanyUserByDocumentEmailOrId(filter: string): Promise<CompanyUserEntity>;
}
