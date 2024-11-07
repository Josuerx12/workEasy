import { UseCase } from "@src/core/shared/useCase/useCase";
import {
  CompanyUserRoleInputParams,
  ICompanyUserRoleRepository,
} from "../../domain/contracts/companyUserRoleRepository.interface";
import {
  CompanyUserRoleOutput,
  CompanyUserRoleOutputMapper,
} from "../shared/companyUserRole.output";
import {
  PaginationOutput,
  PaginationOutputMapper,
} from "@src/core/shared/paginationOutput";

export type input = {
  page?: number;
  perPage?: number;
  filter?: string;
};

export class GetAllCompanyUserRoleUseCase
  implements UseCase<input, PaginationOutput<CompanyUserRoleOutput>>
{
  constructor(
    private readonly companyUserRoleRepository: ICompanyUserRoleRepository
  ) {}
  async execute(
    input: input
  ): Promise<PaginationOutput<CompanyUserRoleOutput>> {
    const index = await this.companyUserRoleRepository.getAll(
      new CompanyUserRoleInputParams(input)
    );

    const items = index.items.map((item) =>
      CompanyUserRoleOutputMapper.toOutput(item)
    );

    return PaginationOutputMapper.toOutput(items, index);
  }
}
