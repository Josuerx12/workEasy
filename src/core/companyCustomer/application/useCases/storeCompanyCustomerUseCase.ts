import { UseCase } from "@src/core/shared/useCase/useCase";
import { ICompanyCustomerRepository } from "../../domain/contracts/companyCustomerRepository.interface";
import { CompanyCustomerEntity } from "../../domain/entities/companyCustomer.entity";
import {
  CompanyCustomerOutput,
  CompanyCustomerOutputMapper,
} from "../shared/companyCustomer.output";
import { AddressEntity } from "@src/core/address/domain/entities/address.entity";

export type CustomerInput = {
  name: string;
  phone: string;
  documentType: string;
  document: string;
  email: string;
};

export type AddressInput = {
  street: string;
  neighborhood: string;
  number: string;
  city: string;
  state: string;
  cep: string;
  lat?: string;
  long?: string;
};

export type StoreCompanyCustomerInput = {
  companyId: string;
  customer: CustomerInput;
  address: AddressInput;
};

export class StoreCompanyCustomerUseCase
  implements UseCase<StoreCompanyCustomerInput, CompanyCustomerOutput>
{
  constructor(
    private readonly companyCustomerRepository: ICompanyCustomerRepository
  ) {}

  async execute(
    input: StoreCompanyCustomerInput
  ): Promise<CompanyCustomerOutput> {
    const address = input.address ? new AddressEntity(input.address) : null;

    const companyCustomer = new CompanyCustomerEntity({
      ...input,
      ...input.customer,
      address,
    });

    await this.companyCustomerRepository.insert(companyCustomer);

    return CompanyCustomerOutputMapper.toOutput(companyCustomer);
  }
}
