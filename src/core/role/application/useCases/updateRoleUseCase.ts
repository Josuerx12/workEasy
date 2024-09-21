import { UseCase } from "src/core/shared/useCase/useCase";
import { RoleOutput, RoleOutputMapper } from "../shared/role.output";
import { IRoleRepository } from "../../domain/contracts/role.interface";

export type updateRoleInput = {
  id: string;
  name?: string;
  description?: string;
};

export class UpdateRoleUseCase implements UseCase<updateRoleInput, RoleOutput> {
  constructor(private readonly roleRepository: IRoleRepository) {}

  async execute(input: updateRoleInput): Promise<RoleOutput> {
    const roleEntity = await this.roleRepository.getById(input.id);

    input.name && roleEntity.changeName(input.name);
    input.description && roleEntity.changeDescription(input.description);

    await this.roleRepository.update(roleEntity);

    return RoleOutputMapper.toOutput(roleEntity);
  }
}
