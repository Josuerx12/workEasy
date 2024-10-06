import { UseCase } from "src/core/shared/useCase/useCase";
import { RoleOutput, RoleOutputMapper } from "../shared/role.output";
import { IRoleRepository } from "../../domain/contracts/role.interface";

export type GetRoleInput = {
  id: string;
};

export class GetRoleUseCase implements UseCase<GetRoleInput, RoleOutput> {
  constructor(private readonly roleRepository: IRoleRepository) {}

  async execute(input: GetRoleInput): Promise<RoleOutput> {
    const role = await this.roleRepository.getById(input.id);

    return RoleOutputMapper.toOutput(role);
  }
}
