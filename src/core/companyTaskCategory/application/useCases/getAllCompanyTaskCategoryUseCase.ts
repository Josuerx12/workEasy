import { UseCase } from "src/core/shared/useCase/useCase";
import {
  CompanyTaskCategoryOutput,
  CompanyTaskCategoryOutputMapper,
} from "../shared/companyTaskCategory.output";
import { ICompanyTaskCategoryRepository } from "../../domain/contracts/companyTaskCategoryRepository.interface";

export type GetAllCompanyTaskCategoryInput = {
  page?: number;
  perPage?: number;
  filter?: string;
};

export class GetAllCompanyTaskCategoryUseCase
  implements
    UseCase<GetAllCompanyTaskCategoryInput, CompanyTaskCategoryOutput[]>
{
  constructor(
    private readonly companyTaskCategoryRepository: ICompanyTaskCategoryRepository
  ) {}

  async execute(
    input: GetAllCompanyTaskCategoryInput
  ): Promise<CompanyTaskCategoryOutput[]> {
    const allCompanyTasksCategory =
      await this.companyTaskCategoryRepository.getAll();

    return allCompanyTasksCategory
      ? allCompanyTasksCategory.map((companyTasksCategory) =>
          CompanyTaskCategoryOutputMapper.toOutput(companyTasksCategory)
        )
      : null;
  }
}
