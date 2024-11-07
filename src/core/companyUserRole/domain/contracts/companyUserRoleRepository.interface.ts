import { BaseRepository } from "@src/core/shared/reporitory/baseRepository";
import { CompanyUserRoleEntity } from "../entities/companyUserRole.entity";
import { OutputParams } from "@src/core/shared/reporitory/outputParams";
import { InputParams } from "@src/core/shared/reporitory/inputParams";

export type CompanyUserRoleFilter = string;

export class CompanyUserRoleInputParams extends InputParams<CompanyUserRoleFilter> {}

export class CompanyUserRoleOutputParams extends OutputParams<CompanyUserRoleEntity> {}

export interface ICompanyUserRoleRepository
  extends BaseRepository<
    CompanyUserRoleEntity,
    CompanyUserRoleInputParams,
    CompanyUserRoleOutputParams
  > {}
