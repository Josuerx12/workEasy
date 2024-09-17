import { BaseRepository } from "src/core/shared/reporitory/baseRepository";
import { CompanyEntity } from "../entities/company.entity";

export interface ICompanyRepository extends BaseRepository<CompanyEntity> {
  getCompanyByDocumentEmailOrId(filter: string): Promise<CompanyEntity>;
}
