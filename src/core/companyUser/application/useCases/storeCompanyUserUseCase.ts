import { UseCase } from "src/core/shared/useCase/useCase";
import { ICompanyUserRepository } from "../../domain/contracts/companyUserRepository.interface";
import { CompanyUserEntity } from "../../domain/entities/companyUser.entity";
import {
  CompanyUserOutput,
  CompanyUserOutputMapper,
} from "../shared/companyUser.output";
import { UserInput } from "src/core/user/application/useCases/storeUserUseCase";
import { UserEntity } from "src/core/user/domain/entities/user.entity";
export type StoreCompanyUserInput = {
  companyId: string;
  userId?: string;
  user: UserInput;
  lat?: string;
  long?: string;
};

export class StoreCompanyUserUseCase
  implements UseCase<StoreCompanyUserInput, CompanyUserOutput>
{
  constructor(private readonly companyUserRepository: ICompanyUserRepository) {}

  async execute(input: StoreCompanyUserInput): Promise<CompanyUserOutput> {
    const user = new UserEntity(input.user);

    const companyUser = new CompanyUserEntity({ ...input, user });

    await this.companyUserRepository.insert(companyUser);

    return CompanyUserOutputMapper.toOutput(companyUser);
  }
}
