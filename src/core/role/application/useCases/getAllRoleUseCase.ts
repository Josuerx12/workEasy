import { UseCase } from "src/core/shared/useCase/useCase";
import { IRoleRepository } from "../../domain/contracts/role.interface";
import { RoleOutput, RoleOutputMapper } from "../shared/role.output";

export type input = {
  page?: number;
  perPage?: number;
  filter?: string;
};

export class GetAllRoleUseCase implements UseCase<input, RoleOutput[]> {
  constructor(private readonly roleRepository: IRoleRepository) {}
  async execute(input: input): Promise<RoleOutput[]> {
    const role = await this.roleRepository.getAll();

    return role ? role.map((role) => RoleOutputMapper.toOutput(role)) : null;
  }
}
