import { UseCase } from "src/core/shared/useCase/useCase";
import { CompanyOutput, CompanyOutputMapper } from "../shared/company.output";
import { ICompanyRepository } from "../../domain/contracts/companyRepository.interface";

export type input = {
  page?: number;
  perPage?: number;
  filter?: string;
};

export class GetAllCompanyUseCase implements UseCase<input, CompanyOutput[]> {
  constructor(private readonly companyRepository: ICompanyRepository) {}
  async execute(input: input): Promise<CompanyOutput[]> {
    const companies = await this.companyRepository.getAll();

    return companies
      ? companies.map((company) => CompanyOutputMapper.toOutput(company))
      : null;
  }
}
