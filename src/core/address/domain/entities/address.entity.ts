import { CompanyEntity } from "@src/core/company/domain/entities/company.entity";
import { CompanyCustomerEntity } from "@src/core/companyCustomer/domain/entities/companyCustomer.entity";
import { Entity } from "@src/core/shared/entity/entity";
import { Uuid } from "@src/core/shared/valueObjects/uuid.vo";

export type AddressEntityProps = {
  id?: string;

  street: string;
  neighborhood: string;
  number: string;
  city: string;
  state: string;
  cep: string;
  lat?: string;
  long?: string;

  company?: CompanyEntity[];
  companyCustomer?: CompanyCustomerEntity[];

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class AddressEntity extends Entity {
  id: Uuid;

  street: string;
  neighborhood: string;
  number: string;
  city: string;
  state: string;
  cep: string;
  lat?: string;
  long?: string;

  company?: CompanyEntity[];
  companyCustomer?: CompanyCustomerEntity[];

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  constructor(props: AddressEntityProps) {
    super();

    this.id = new Uuid(props.id);
    this.street = props.street;
    this.neighborhood = props.neighborhood;
    this.number = props.number;
    this.city = props.city;
    this.state = props.state;
    this.cep = props.cep;
    this.lat = props.lat;
    this.long = props.long;
    this.company = props.company;
    this.companyCustomer = props.companyCustomer;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;

    this.validate();
  }

  toJSON() {
    return {
      id: this.id.value,
      street: this.street,
      neighborhood: this.neighborhood,
      number: this.number,
      city: this.city,
      state: this.state,
      cep: this.cep,
      lat: this.lat,
      long: this.long,
      company: this.company?.map((c) => c.toJSON()),
      companyCustomer: this.companyCustomer?.map((cc) => cc.toJSON()),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
  validate() {}
}
