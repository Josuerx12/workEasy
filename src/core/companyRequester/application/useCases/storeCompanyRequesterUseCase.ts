import { UseCase } from "@src/core/shared/useCase/useCase";
import { ICompanyRequesterRepository } from "../../domain/contracts/companyRequesterRepository.interface";
import { CompanyRequesterEntity } from "../../domain/entities/companyRequester.entity";
import {
  CompanyRequesterOutput,
  CompanyRequesterOutputMapper,
} from "../shared/companyRequester.output";
import { UserInput } from "@src/core/user/application/useCases/storeUserUseCase";
import { UserEntity } from "@src/core/user/domain/entities/user.entity";
import { IUserRepository } from "@src/core/user/domain/contracts/userRepository.interface";

export type StoreCompanyRequesterInput = {
  companyId: string;
  user: UserInput;
};

export class StoreCompanyRequesterUseCase
  implements UseCase<StoreCompanyRequesterInput, CompanyRequesterOutput>
{
  constructor(
    private readonly companyRequesterRepository: ICompanyRequesterRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async execute(
    input: StoreCompanyRequesterInput
  ): Promise<CompanyRequesterOutput> {
    const user = await this.validateUserEmailAlreadyExists(input.user);

    const companyRequester = new CompanyRequesterEntity({ ...input, user });

    await this.companyRequesterRepository.insert(companyRequester);

    return CompanyRequesterOutputMapper.toOutput(companyRequester);
  }

  private async validateUserEmailAlreadyExists(
    input: UserInput
  ): Promise<UserEntity> {
    const userExists = await this.userRepository.getByEmail(input.email);

    if (userExists) {
      const companyRequester =
        await this.companyRequesterRepository.getCompanyRequesterByEmailOrId(
          userExists.id.value
        );

      if (companyRequester) {
        throw new Error(
          `Usuário com email ${userExists.email}, já associado a empresa ${companyRequester.company.name}`
        );
      }

      return userExists;
    } else {
      return UserEntity.create(input);
    }
  }
}
