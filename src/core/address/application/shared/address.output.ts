import { CompanyOutput } from "src/core/company/application/shared/company.output";
import { AddressEntity } from "../../domain/entities/address.entity";

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
  companyClient: any[];

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class AddressOutputMapper {
  static toOutput(addressEntity: AddressEntity): AddressOutput {
    return addressEntity.toJSON();
  }
}
