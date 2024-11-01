import { UseCase } from "@src/core/shared/useCase/useCase";
import { ICompanyRequesterRepository } from "../../domain/contracts/companyRequesterRepository.interface";
import {
  CompanyRequesterOutput,
  CompanyRequesterOutputMapper,
} from "../shared/companyRequester.output";

export type input = {
  page?: number;
  perPage?: number;
  filter?: string;
};

export class GetAllCompanyRequesterUseCase
  implements UseCase<input, CompanyRequesterOutput[]>
{
  constructor(
    private readonly companyRequesterRepository: ICompanyRequesterRepository
  ) {}
  async execute(input: input): Promise<CompanyRequesterOutput[]> {
    const companies = await this.companyRequesterRepository.getAll();

    return companies
      ? companies.map((companyRequester) =>
          CompanyRequesterOutputMapper.toOutput(companyRequester)
        )
      : null;
  }
}
