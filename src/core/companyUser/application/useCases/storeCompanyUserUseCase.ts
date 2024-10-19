import { UseCase } from "src/core/shared/useCase/useCase";
import { ICompanyUserRepository } from "../../domain/contracts/companyUserRepository.interface";
import { CompanyUserEntity } from "../../domain/entities/companyUser.entity";
import {
  CompanyUserOutput,
  CompanyUserOutputMapper,
} from "../shared/companyUser.output";
export type StoreCompanyUserInput = {
  companyId: string;
  userId: string;
  lat?: string;
  long?: string;
};

export class StoreCompanyUserUseCase
  implements UseCase<StoreCompanyUserInput, CompanyUserOutput>
{
  constructor(private readonly companyUserRepository: ICompanyUserRepository) {}

  async execute(input: StoreCompanyUserInput): Promise<CompanyUserOutput> {
    const companyUser = new CompanyUserEntity(input);

    await this.companyUserRepository.insert(companyUser);

    return CompanyUserOutputMapper.toOutput(companyUser);
  }
}
