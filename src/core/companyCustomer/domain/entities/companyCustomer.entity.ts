import { AddressEntity } from "@src/core/address/domain/entities/address.entity";
import { CompanyEntity } from "@src/core/company/domain/entities/company.entity";
import { Entity } from "@src/core/shared/entity/entity";
import { Uuid } from "@src/core/shared/valueObjects/uuid.vo";
import { CompanyCustomerValidator } from "../validators/companyCustomer.validator";

export type CompanyCustomerEntityProps = {
  id?: string;
  companyId: string;
  addressId?: string;

  name: string;
  phone: string;
  documentType: string;
  document: string;
  email: string;

  company?: CompanyEntity;
  address?: AddressEntity;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class CompanyCustomerEntity extends Entity {
  id?: Uuid;
  companyId: Uuid;
  addressId: Uuid;

  name: string;
  phone: string;
  documentType: string;
  document: string;
  email: string;

  company?: CompanyEntity;
  address?: AddressEntity;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor(props: CompanyCustomerEntityProps) {
    super();

    this.id = new Uuid(props.id);
    this.companyId = new Uuid(props.companyId);
    this.addressId = props.addressId
      ? new Uuid(props.addressId)
      : props.address
      ? props.address.id
      : null;

    this.name = props.name;
    this.phone = props.phone?.replace(/\D/g, "");
    this.documentType = props.documentType;
    this.document = props.document?.replace(/\D/g, "");
    this.email = props.email;

    this.company = props.company;
    this.address = props.address;

    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;

    this.validate();
  }

  changeName(value: string) {
    this.name = value;
    this.validate();
  }

  changePhone(value: string) {
    this.phone = value?.replace(/\D/g, "");
    this.validate();
  }

  changeEmail(value: string) {
    this.email = value;
    this.validate();
  }

  toJSON() {
    return {
      id: this.id.value,
      companyId: this.companyId.value,
      addressId: this.addressId?.value,

      name: this.name,
      phone: this.phone,
      documentType: this.documentType,
      document: this.document,
      email: this.email,

      address: this.address,
      company: this.company,

      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
  validate() {
    return new CompanyCustomerValidator({
      email: this.email,
      name: this.name,
      phone: this.phone,
    }).validate();
  }
}
