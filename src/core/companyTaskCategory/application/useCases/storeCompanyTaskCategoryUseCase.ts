import { UseCase } from "@src/core/shared/useCase/useCase";
import { ICompanyTaskCategoryRepository } from "../../domain/contracts/companyTaskCategoryRepository.interface";
import { CompanyTaskCategoryEntity } from "../../domain/entities/companyTaskCategory.entity";
import {
  CompanyTaskCategoryOutput,
  CompanyTaskCategoryOutputMapper,
} from "../shared/companyTaskCategory.output";

export type StoreCompanyTaskCategoryInput = {
  companyId: string;
  title: string;
  description: string;
};

export class StoreCompanyTaskCategoryUseCase
  implements UseCase<StoreCompanyTaskCategoryInput, CompanyTaskCategoryOutput>
{
  constructor(
    private readonly companyTaskCategoryRepository: ICompanyTaskCategoryRepository
  ) {}

  async execute(
    input: StoreCompanyTaskCategoryInput
  ): Promise<CompanyTaskCategoryOutput> {
    const entity = new CompanyTaskCategoryEntity(input);

    await this.companyTaskCategoryRepository.insert(entity);

    return CompanyTaskCategoryOutputMapper.toOutput(entity);
  }
}
