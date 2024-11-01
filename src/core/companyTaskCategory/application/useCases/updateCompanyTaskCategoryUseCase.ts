import { UseCase } from "@src/core/shared/useCase/useCase";
import { ICompanyTaskCategoryRepository } from "../../domain/contracts/companyTaskCategoryRepository.interface";
import {
  CompanyTaskCategoryOutput,
  CompanyTaskCategoryOutputMapper,
} from "../shared/companyTaskCategory.output";

export type UpdateCompanyTaskInput = {
  id: string;
  title?: string;
  description?: string;
};

export class UpdateCompanyTaskCategoryUseCase
  implements UseCase<UpdateCompanyTaskInput, CompanyTaskCategoryOutput>
{
  constructor(
    private readonly companyTaskCategoryRepository: ICompanyTaskCategoryRepository
  ) {}

  async execute(
    input: UpdateCompanyTaskInput
  ): Promise<CompanyTaskCategoryOutput> {
    const entity = await this.companyTaskCategoryRepository.getById(input.id);

    input.title && entity.changeTitle(input.title);
    input.description && entity.changeDescription(input.description);

    await this.companyTaskCategoryRepository.update(entity);

    return CompanyTaskCategoryOutputMapper.toOutput(entity);
  }
}
