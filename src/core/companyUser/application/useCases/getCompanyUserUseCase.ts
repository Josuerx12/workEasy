import { UseCase } from "src/core/shared/useCase/useCase";
import { ICompanyUserRepository } from "../../domain/contracts/companyUserRepository.interface";
import {
  CompanyUserOutput,
  CompanyUserOutputMapper,
} from "../shared/companyUser.output";
export type CompanyUserInput = {
  id: string;
};

export class GetCompanyUserUseCase implements UseCase<CompanyUserInput, any> {
  constructor(private readonly companyUserRepository: ICompanyUserRepository) {}
  async execute(input: CompanyUserInput): Promise<CompanyUserOutput> {
    const companyUserEntity =
      await this.companyUserRepository.getCompanyUserByDocumentEmailOrId(
        input.id
      );

    return CompanyUserOutputMapper.toOutput(companyUserEntity);
  }
}
