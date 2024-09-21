import { UseCase } from "src/core/shared/useCase/useCase";
import { RoleOutput, RoleOutputMapper } from "../shared/role.output";
import { IRoleRepository } from "../../domain/contracts/role.interface";

export type ShowRoleInput = {
  id: string;
};

export class ShowRoleUseCase implements UseCase<ShowRoleInput, RoleOutput> {
  constructor(private readonly roleRepository: IRoleRepository) {}

  async execute(input: ShowRoleInput): Promise<RoleOutput> {
    const role = await this.roleRepository.getById(input.id);

    return RoleOutputMapper.toOutput(role);
  }
}
