import { UseCase } from "@src/core/shared/useCase/useCase";
import { ICompanyRequesterRepository } from "../../domain/contracts/companyRequesterRepository.interface";
import {
  CompanyRequesterOutput,
  CompanyRequesterOutputMapper,
} from "../shared/companyRequester.output";

export type UpdateCompanyRequesterInput = {
  id: string;
};

export class UpdateCompanyRequesterUseCase
  implements UseCase<UpdateCompanyRequesterInput, CompanyRequesterOutput>
{
  constructor(
    private readonly companyRequesterRepository: ICompanyRequesterRepository
  ) {}

  async execute(
    input: UpdateCompanyRequesterInput
  ): Promise<CompanyRequesterOutput> {
    const companyRequesterEntity =
      await this.companyRequesterRepository.getCompanyRequesterByEmailOrId(
        input.id
      );

    await this.companyRequesterRepository.update(companyRequesterEntity);

    return CompanyRequesterOutputMapper.toOutput(companyRequesterEntity);
  }
}
