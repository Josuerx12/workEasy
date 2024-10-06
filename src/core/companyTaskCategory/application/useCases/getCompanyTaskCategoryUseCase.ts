import { UseCase } from "src/core/shared/useCase/useCase";
import {
  CompanyTaskCategoryOutput,
  CompanyTaskCategoryOutputMapper,
} from "../shared/companyTaskCategory.output";
import { ICompanyTaskCategoryRepository } from "../../domain/contracts/companyTaskCategoryRepository.interface";

export type GetByIdCompanyTaskCategory = {
  id: string;
};

export class GetCompanyTaskCategoryUseCase
  implements UseCase<GetByIdCompanyTaskCategory, CompanyTaskCategoryOutput>
{
  constructor(
    private readonly companyTaskCategoryRepository: ICompanyTaskCategoryRepository
  ) {}

  async execute(
    input: GetByIdCompanyTaskCategory
  ): Promise<CompanyTaskCategoryOutput> {
    const companyTaskCategory =
      await this.companyTaskCategoryRepository.getById(input.id);

    return CompanyTaskCategoryOutputMapper.toOutput(companyTaskCategory);
  }
}
