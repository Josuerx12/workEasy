import { UseCase } from "@src/core/shared/useCase/useCase";
import { ICompanyUserRoleRepository } from "../../domain/contracts/companyUserRoleRepository.interface";
import {
  CompanyUserRoleOutput,
  CompanyUserRoleOutputMapper,
} from "../shared/companyUserRole.output";

export type input = {
  page?: number;
  perPage?: number;
  filter?: string;
};

export class GetAllCompanyUserRoleUseCase
  implements UseCase<input, CompanyUserRoleOutput[]>
{
  constructor(
    private readonly companyUserRoleRepository: ICompanyUserRoleRepository
  ) {}
  async execute(input: input): Promise<CompanyUserRoleOutput[]> {
    const companies = await this.companyUserRoleRepository.getAll();

    return companies
      ? companies.map((companyUserRole) =>
          CompanyUserRoleOutputMapper.toOutput(companyUserRole)
        )
      : null;
  }
}
