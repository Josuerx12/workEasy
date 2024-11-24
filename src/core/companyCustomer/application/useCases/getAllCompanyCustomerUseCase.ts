import { UseCase } from "@src/core/shared/useCase/useCase";
import {
  PaginationOutput,
  PaginationOutputMapper,
} from "@src/core/shared/paginationOutput";
import { ICompanyCustomerRepository } from "../../domain/contracts/companyCustomerRepository.interface";
import {
  CompanyCustomerOutput,
  CompanyCustomerOutputMapper,
} from "../shared/companyCustomer.output";

export type input = {
  companyId: string;
  page?: number;
  perPage?: number;
  filter?: string;
};

export class GetAllCompanyCustomerUseCase
  implements UseCase<input, PaginationOutput<CompanyCustomerOutput>>
{
  constructor(
    private readonly companyCustomerRepository: ICompanyCustomerRepository
  ) {}
  async execute(
    input: input
  ): Promise<PaginationOutput<CompanyCustomerOutput>> {
    const index = await this.companyCustomerRepository.getAll(input);

    const items = index.items.map((item) =>
      CompanyCustomerOutputMapper.toOutput(item)
    );

    return PaginationOutputMapper.toOutput(items, index);
  }
}
