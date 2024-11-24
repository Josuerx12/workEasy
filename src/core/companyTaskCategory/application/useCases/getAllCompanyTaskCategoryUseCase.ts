import { UseCase } from "@src/core/shared/useCase/useCase";
import { ICompanyTaskCategoryRepository } from "../../domain/contracts/companyTaskCategoryRepository.interface";
import {
  CompanyTaskCategoryOutput,
  CompanyTaskCategoryOutputMapper,
} from "../shared/companyTaskCategory.output";
import {
  PaginationOutput,
  PaginationOutputMapper,
} from "@src/core/shared/paginationOutput";

export type GetAllCompanyTaskCategoryInput = {
  companyId: string;
  page?: number;
  perPage?: number;
  filter?: string;
};

export class GetAllCompanyTaskCategoryUseCase
  implements
    UseCase<
      GetAllCompanyTaskCategoryInput,
      PaginationOutput<CompanyTaskCategoryOutput>
    >
{
  constructor(
    private readonly companyTaskCategoryRepository: ICompanyTaskCategoryRepository
  ) {}

  async execute(
    input: GetAllCompanyTaskCategoryInput
  ): Promise<PaginationOutput<CompanyTaskCategoryOutput>> {
    const index = await this.companyTaskCategoryRepository.getAll(input);
    const items = index.items.map((item) =>
      CompanyTaskCategoryOutputMapper.toOutput(item)
    );
    return PaginationOutputMapper.toOutput(items, index);
  }
}
