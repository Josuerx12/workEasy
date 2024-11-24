import { CompanyOutput } from "@src/core/company/application/shared/company.output";
import { AddressEntity } from "../../domain/entities/address.entity";
import {
  CompanyCustomerOutput,
  CompanyCustomerOutputMapper,
} from "@src/core/companyCustomer/application/shared/companyCustomer.output";

export type AddressOutput = {
  id: string;
  street: string;
  neighborhood: string;
  number: string;
  city: string;
  state: string;
  cep: string;
  lat: string;
  long: string;
  company: CompanyOutput[];
  companyCustomer: CompanyCustomerOutput[];

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class AddressOutputMapper {
  static toOutput(addressEntity: AddressEntity): AddressOutput {
    const { companyCustomer } = addressEntity;
    return {
      ...addressEntity.toJSON(),
      companyCustomer: companyCustomer
        ? companyCustomer.map((cc) => CompanyCustomerOutputMapper.toOutput(cc))
        : null,
    };
  }
}
