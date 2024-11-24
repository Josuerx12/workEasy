import { UseCase } from "@src/core/shared/useCase/useCase";
import { ICompanyCustomerRepository } from "../../domain/contracts/companyCustomerRepository.interface";
import {
  CompanyCustomerOutput,
  CompanyCustomerOutputMapper,
} from "../shared/companyCustomer.output";

export type CompanyCustomerInput = {
  id: string;
};

export class GetCompanyCustomerUseCase
  implements UseCase<CompanyCustomerInput, CompanyCustomerOutput>
{
  constructor(
    private readonly companyCustomerRepository: ICompanyCustomerRepository
  ) {}
  async execute(input: CompanyCustomerInput): Promise<CompanyCustomerOutput> {
    const companyCustomerEntity = await this.companyCustomerRepository.getById(
      input.id
    );

    return CompanyCustomerOutputMapper.toOutput(companyCustomerEntity);
  }
}
