import { BaseRepository } from "@src/core/shared/reporitory/baseRepository";
import { CompanyRequesterEntity } from "../entities/companyRequester.entity";
import { OutputParams } from "@src/core/shared/reporitory/outputParams";

export interface GetAllCompanyRequesterInputParams {
  perPage?: number;
  page?: number;
  filter?: string;
}

export class CompanyRequesterOutputParams extends OutputParams<CompanyRequesterEntity> {}

export interface ICompanyRequesterRepository
  extends BaseRepository<
    CompanyRequesterEntity,
    GetAllCompanyRequesterInputParams,
    CompanyRequesterOutputParams
  > {
  getCompanyRequesterByEmailOrId(
    filter: string
  ): Promise<CompanyRequesterEntity>;
}
