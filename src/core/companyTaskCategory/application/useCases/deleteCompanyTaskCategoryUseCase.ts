import { UseCase } from "@src/core/shared/useCase/useCase";
import { ICompanyTaskCategoryRepository } from "../../domain/contracts/companyTaskCategoryRepository.interface";

export type DeleteCompanyTaskCategoryInput = {
  id: string;
};

export class DeleteCompanyTaskCategoryUseCase
  implements UseCase<DeleteCompanyTaskCategoryInput, void>
{
  constructor(
    private readonly companyTaskCategoryRepository: ICompanyTaskCategoryRepository
  ) {}

  async execute(input: DeleteCompanyTaskCategoryInput): Promise<void> {
    await this.companyTaskCategoryRepository.delete(input.id);
  }
}
