import { UseCase } from "@src/core/shared/useCase/useCase";
import { ICompanyRequesterRepository } from "../../domain/contracts/companyRequesterRepository.interface";
import {
  CompanyRequesterOutput,
  CompanyRequesterOutputMapper,
} from "../shared/companyRequester.output";
import {
  PaginationOutput,
  PaginationOutputMapper,
} from "@src/core/shared/paginationOutput";

export type input = {
  page?: number;
  perPage?: number;
  filter?: string;
};

export class GetAllCompanyRequesterUseCase
  implements UseCase<input, PaginationOutput<CompanyRequesterOutput>>
{
  constructor(
    private readonly companyRequesterRepository: ICompanyRequesterRepository
  ) {}
  async execute(
    input: input
  ): Promise<PaginationOutput<CompanyRequesterOutput>> {
    const index = await this.companyRequesterRepository.getAll(input);

    const items = index.items.map((item) =>
      CompanyRequesterOutputMapper.toOutput(item)
    );

    return PaginationOutputMapper.toOutput(items, index);
  }
}
