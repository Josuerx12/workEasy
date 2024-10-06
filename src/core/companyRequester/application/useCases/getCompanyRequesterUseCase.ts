import { UseCase } from "src/core/shared/useCase/useCase";
import { ICompanyRequesterRepository } from "../../domain/contracts/companyRequesterRepository.interface";
import {
  CompanyRequesterOutput,
  CompanyRequesterOutputMapper,
} from "../shared/companyRequester.output";
export type CompanyRequesterInput = {
  id: string;
};

export class GetCompanyRequesterUseCase
  implements UseCase<CompanyRequesterInput, CompanyRequesterOutput>
{
  constructor(
    private readonly companyRequesterRepository: ICompanyRequesterRepository
  ) {}
  async execute(input: CompanyRequesterInput): Promise<CompanyRequesterOutput> {
    const companyRequesterEntity =
      await this.companyRequesterRepository.getCompanyRequesterByEmailOrId(
        input.id
      );

    return CompanyRequesterOutputMapper.toOutput(companyRequesterEntity);
  }
}
