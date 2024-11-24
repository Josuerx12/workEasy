import { BaseRepository } from "@src/core/shared/reporitory/baseRepository";
import { OutputParams } from "@src/core/shared/reporitory/outputParams";
import { CompanyCustomerEntity } from "../entities/companyCustomer.entity";

export interface GetAllCompanyCustomerInputParams {
  perPage?: number;
  page?: number;
  filter?: string;
}

export class CompanyCustomerOutputParams extends OutputParams<CompanyCustomerEntity> {}

export interface ICompanyCustomerRepository
  extends BaseRepository<
    CompanyCustomerEntity,
    GetAllCompanyCustomerInputParams,
    CompanyCustomerOutputParams
  > {
  getCompanyCustomer(
    filter: string,
    companyId: string
  ): Promise<CompanyCustomerEntity>;
}
