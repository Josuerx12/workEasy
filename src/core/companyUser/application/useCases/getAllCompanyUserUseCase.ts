import { UseCase } from "src/core/shared/useCase/useCase";
import {
  CompanyUserOutput,
  CompanyUserOutputMapper,
} from "../shared/companyUser.output";
import { ICompanyUserRepository } from "../../domain/contracts/companyUserRepository.interface";

export type input = {
  page?: number;
  perPage?: number;
  filter?: string;
};

export class GetAllCompanyUserUseCase
  implements UseCase<input, CompanyUserOutput[]>
{
  constructor(private readonly companyUserRepository: ICompanyUserRepository) {}
  async execute(input: input): Promise<CompanyUserOutput[]> {
    const companies = await this.companyUserRepository.getAll();

    return companies
      ? companies.map((companyUser) =>
          CompanyUserOutputMapper.toOutput(companyUser)
        )
      : null;
  }
}
