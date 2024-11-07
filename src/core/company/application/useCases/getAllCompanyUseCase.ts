import { UseCase } from "@src/core/shared/useCase/useCase";
import {
  CompanyFilter,
  CompanyInputParams,
  ICompanyRepository,
} from "../../domain/contracts/companyRepository.interface";
import { CompanyOutput, CompanyOutputMapper } from "../shared/company.output";
import {
  PaginationOutput,
  PaginationOutputMapper,
} from "@src/core/shared/paginationOutput";

export type input = {
  page?: string;
  perPage?: string;
  filter?: CompanyFilter;
};

export class GetAllCompanyUseCase
  implements UseCase<input, PaginationOutput<CompanyOutput>>
{
  constructor(private readonly companyRepository: ICompanyRepository) {}
  async execute(input: input): Promise<PaginationOutput<CompanyOutput>> {
    const companies = await this.companyRepository.getAll(
      new CompanyInputParams(input)
    );

    const output = companies.items.map((item) =>
      CompanyOutputMapper.toOutput(item)
    );

    return PaginationOutputMapper.toOutput(output, companies);
  }
}
