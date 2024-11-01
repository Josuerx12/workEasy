import { BaseRepository } from "@src/core/shared/reporitory/baseRepository";
import { CompanyUserRoleEntity } from "../entities/companyUserRole.entity";

export interface ICompanyUserRoleRepository
  extends BaseRepository<CompanyUserRoleEntity> {}
