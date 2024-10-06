import { BaseRepository } from "src/core/shared/reporitory/baseRepository";
import { CompanyRequesterEntity } from "../entities/companyRequester.entity";

export interface ICompanyRequesterRepository
  extends BaseRepository<CompanyRequesterEntity> {
  getCompanyRequesterByEmailOrId(
    filter: string
  ): Promise<CompanyRequesterEntity>;
}
