import { BaseRepository } from "@src/core/shared/reporitory/baseRepository";
import { CompanyUserEntity } from "../entities/companyUser.entity";

export interface ICompanyUserRepository
  extends BaseRepository<CompanyUserEntity> {
  getCompanyUserByDocumentEmailOrId(filter: string): Promise<CompanyUserEntity>;
}
