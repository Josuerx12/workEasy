import { UseCase } from "src/core/shared/useCase/useCase";
import { ICompanyRequesterRepository } from "../../domain/contracts/companyRequesterRepository.interface";
import { CompanyRequesterEntity } from "../../domain/entities/companyRequester.entity";
import {
  CompanyRequesterOutput,
  CompanyRequesterOutputMapper,
} from "../shared/companyRequester.output";
export type StoreCompanyRequesterInput = {
  companyId: string;
  userId: string;
};

export class StoreCompanyRequesterUseCase
  implements UseCase<StoreCompanyRequesterInput, CompanyRequesterOutput>
{
  constructor(
    private readonly companyRequesterRepository: ICompanyRequesterRepository
  ) {}

  async execute(
    input: StoreCompanyRequesterInput
  ): Promise<CompanyRequesterOutput> {
    const companyRequester = new CompanyRequesterEntity(input);

    await this.companyRequesterRepository.insert(companyRequester);

    return CompanyRequesterOutputMapper.toOutput(companyRequester);
  }
}
