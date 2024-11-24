import { UseCase } from "@src/core/shared/useCase/useCase";
import {
  CompanyUserInputParams,
  ICompanyUserRepository,
} from "../../domain/contracts/companyUserRepository.interface";
import {
  CompanyUserOutput,
  CompanyUserOutputMapper,
} from "../shared/companyUser.output";
import {
  PaginationOutput,
  PaginationOutputMapper,
} from "@src/core/shared/paginationOutput";

export type input = {
  page?: number;
  perPage?: number;
  filter?: string;
};

export class GetAllCompanyUserUseCase
  implements UseCase<input, PaginationOutput<CompanyUserOutput>>
{
  constructor(private readonly companyUserRepository: ICompanyUserRepository) {}
  async execute(
    input: input,
    companyId: string
  ): Promise<PaginationOutput<CompanyUserOutput>> {
    const index = await this.companyUserRepository.getAll(
      new CompanyUserInputParams(input),
      companyId
    );

    const items = index.items.map((item) =>
      CompanyUserOutputMapper.toOutput(item)
    );

    return PaginationOutputMapper.toOutput(items, index);
  }
}
