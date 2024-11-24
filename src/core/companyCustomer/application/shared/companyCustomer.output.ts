import {
  AddressOutput,
  AddressOutputMapper,
} from "@src/core/address/application/shared/address.output";
import {
  CompanyOutput,
  CompanyOutputMapper,
} from "@src/core/company/application/shared/company.output";
import { CompanyCustomerEntity } from "../../domain/entities/companyCustomer.entity";

export type CompanyCustomerOutput = {
  id: string;
  companyId: string;
  addressId: string;

  name: string;
  email: string;
  phone: string;
  documentType: string;
  document: string;

  company?: CompanyOutput;
  address?: AddressOutput;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class CompanyCustomerOutputMapper {
  static toOutput(
    companyCustomerEntity: CompanyCustomerEntity
  ): CompanyCustomerOutput {
    return companyCustomerEntity
      ? {
          ...companyCustomerEntity.toJSON(),
          company: companyCustomerEntity.company
            ? CompanyOutputMapper.toOutput(companyCustomerEntity.company)
            : null,
          address: companyCustomerEntity.address
            ? AddressOutputMapper.toOutput(companyCustomerEntity.address)
            : null,
        }
      : null;
  }
}
