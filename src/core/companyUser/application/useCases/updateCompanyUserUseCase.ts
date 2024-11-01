import { UseCase } from "@src/core/shared/useCase/useCase";
import { ICompanyUserRepository } from "../../domain/contracts/companyUserRepository.interface";
import {
  CompanyUserOutput,
  CompanyUserOutputMapper,
} from "../shared/companyUser.output";

export type UpdateCompanyUserInput = {
  id: string;
  lat?: string;
  long?: string;
};

export class UpdateCompanyUserUseCase
  implements UseCase<UpdateCompanyUserInput, CompanyUserOutput>
{
  constructor(private readonly companyUserRepository: ICompanyUserRepository) {}

  async execute(input: UpdateCompanyUserInput): Promise<CompanyUserOutput> {
    const companyUserEntity =
      await this.companyUserRepository.getCompanyUserByDocumentEmailOrId(
        input.id
      );

    input.lat && companyUserEntity.changeLat(input.lat);
    input.long && companyUserEntity.changeLong(input.long);

    await this.companyUserRepository.update(companyUserEntity);

    return CompanyUserOutputMapper.toOutput(companyUserEntity);
  }
}
