import { UseCase } from "@src/core/shared/useCase/useCase";
import { UserInput } from "@src/core/user/application/useCases/storeUserUseCase";
import { UserEntity } from "@src/core/user/domain/entities/user.entity";
import { ICompanyUserRepository } from "../../domain/contracts/companyUserRepository.interface";
import { CompanyUserEntity } from "../../domain/entities/companyUser.entity";
import {
  CompanyUserOutput,
  CompanyUserOutputMapper,
} from "../shared/companyUser.output";
import { IUserRepository } from "@src/core/user/domain/contracts/userRepository.interface";

export type StoreCompanyUserInput = {
  companyId: string;
  user: UserInput;
  lat?: string;
  long?: string;
};

export class StoreCompanyUserUseCase
  implements UseCase<StoreCompanyUserInput, CompanyUserOutput>
{
  constructor(
    private readonly companyUserRepository: ICompanyUserRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async execute(input: StoreCompanyUserInput): Promise<CompanyUserOutput> {
    const user = await this.validateUserEmailAlreadyExists(input.user);

    const companyUser = new CompanyUserEntity({ ...input, user });

    await this.companyUserRepository.insert(companyUser);

    return CompanyUserOutputMapper.toOutput(companyUser);
  }

  private async validateUserEmailAlreadyExists(
    user: UserInput
  ): Promise<UserEntity> {
    const userExists = await this.userRepository.getByEmail(user.email);

    if (userExists) {
      const companyUser =
        await this.companyUserRepository.getCompanyUserByDocumentEmailOrId(
          userExists.id.value
        );

      if (companyUser) {
        throw new Error(
          `Usuário com email ${userExists.email}, já associado a empresa ${companyUser.company.name}`
        );
      }
      return userExists;
    } else {
      return UserEntity.create(user);
    }
  }
}
