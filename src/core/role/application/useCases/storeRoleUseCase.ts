import { UseCase } from "@src/core/shared/useCase/useCase";
import { IRoleRepository } from "../../domain/contracts/role.interface";
import { RoleEntity } from "../../domain/entities/role.entity";
import { RoleOutput, RoleOutputMapper } from "../shared/role.output";

export type StoreRoleInput = {
  name: string;
  description: string;
};

export class StoreRoleUseCase implements UseCase<StoreRoleInput, RoleOutput> {
  constructor(private readonly roleRepository: IRoleRepository) {}

  async execute(input: StoreRoleInput): Promise<RoleOutput> {
    const roleEntity = new RoleEntity(input);

    await this.roleRepository.insert(roleEntity);

    return RoleOutputMapper.toOutput(roleEntity);
  }
}
