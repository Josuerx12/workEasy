import { UseCase } from "@src/core/shared/useCase/useCase";
import {
  IRoleRepository,
  RoleInputParams,
} from "../../domain/contracts/role.interface";
import { RoleOutput, RoleOutputMapper } from "../shared/role.output";
import {
  PaginationOutput,
  PaginationOutputMapper,
} from "@src/core/shared/paginationOutput";

export type input = {
  page?: number;
  perPage?: number;
  filter?: string;
};

export class GetAllRoleUseCase
  implements UseCase<input, PaginationOutput<RoleOutput>>
{
  constructor(private readonly roleRepository: IRoleRepository) {}
  async execute(input: input): Promise<PaginationOutput<RoleOutput>> {
    const index = await this.roleRepository.getAll(new RoleInputParams(input));

    const items = index.items.map((role) => RoleOutputMapper.toOutput(role));

    return PaginationOutputMapper.toOutput(items, index);
  }
}
