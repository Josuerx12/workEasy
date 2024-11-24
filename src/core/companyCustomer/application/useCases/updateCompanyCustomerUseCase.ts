import { UseCase } from "@src/core/shared/useCase/useCase";
import { ICompanyCustomerRepository } from "../../domain/contracts/companyCustomerRepository.interface";
import {
  CompanyCustomerOutput,
  CompanyCustomerOutputMapper,
} from "../shared/companyCustomer.output";
import { CompanyCustomerEntity } from "../../domain/entities/companyCustomer.entity";

export type UpdateCompanyCustomerInput = {
  id: string;
  phone?: string;
  email?: string;
  name?: string;
};

export class UpdateCompanyCustomerUseCase
  implements UseCase<UpdateCompanyCustomerInput, CompanyCustomerOutput>
{
  constructor(
    private readonly companyCustomerRepository: ICompanyCustomerRepository
  ) {}

  async execute(
    input: UpdateCompanyCustomerInput
  ): Promise<CompanyCustomerOutput> {
    const companyCustomerEntity = await this.companyCustomerRepository.getById(
      input.id
    );

    if (input.email) {
      await this.verifyIfExistsCustomerWithEmail(
        input.email,
        companyCustomerEntity
      );

      companyCustomerEntity.changeEmail(input.email);
    }

    input.phone && companyCustomerEntity.changePhone(input.phone);
    input.name && companyCustomerEntity.changeName(input.name);

    await this.companyCustomerRepository.update(companyCustomerEntity);

    return CompanyCustomerOutputMapper.toOutput(companyCustomerEntity);
  }

  private async verifyIfExistsCustomerWithEmail(
    email: string,
    entity: CompanyCustomerEntity
  ) {
    const customer = await this.companyCustomerRepository.getCompanyCustomer(
      email,
      entity.companyId.value
    );

    if (customer)
      throw new Error(
        `Email: ${email}, já está sendo utilizado para o cliente desta mesma empresa!`
      );
  }
}
