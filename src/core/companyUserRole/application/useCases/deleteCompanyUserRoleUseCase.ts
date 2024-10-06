import { UseCase } from "src/core/shared/useCase/useCase";
import { ICompanyUserRoleRepository } from "../../domain/contracts/companyUserRoleRepository.interface";

export type DeleteCompanyUserRoleinput = {
  id: string;
};

export class DeleteCompanyUserRoleUseCase
  implements UseCase<DeleteCompanyUserRoleinput, void>
{
  constructor(
    private readonly companyUserRoleRepository: ICompanyUserRoleRepository
  ) {}

  async execute(input: DeleteCompanyUserRoleinput): Promise<void> {
    await this.companyUserRoleRepository.delete(input.id);
  }
}
