import { UseCase } from "src/core/shared/useCase/useCase";
import { ICompanyUserRoleRepository } from "../../domain/contracts/companyUserRoleRepository.interface";
import { CompanyUserRoleEntity } from "../../domain/entities/companyUserRole.entity";
import {
  CompanyUserRoleOutput,
  CompanyUserRoleOutputMapper,
} from "../shared/companyUserRole.output";
export type StoreCompanyUserRoleInput = {
  companyUserId: string;
  roleId: string;
};

export class StoreCompanyUserRoleUseCase
  implements UseCase<StoreCompanyUserRoleInput, CompanyUserRoleOutput>
{
  constructor(
    private readonly companyUserRoleRepository: ICompanyUserRoleRepository
  ) {}

  async execute(
    input: StoreCompanyUserRoleInput
  ): Promise<CompanyUserRoleOutput> {
    const companyUserRole = new CompanyUserRoleEntity(input);

    await this.companyUserRoleRepository.insert(companyUserRole);

    return CompanyUserRoleOutputMapper.toOutput(companyUserRole);
  }
}
