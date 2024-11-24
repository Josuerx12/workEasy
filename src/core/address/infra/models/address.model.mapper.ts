import { Prisma } from "@prisma/client";
import { AddressEntity } from "../../domain/entities/address.entity";

export class AddressModelMapper {
  static toModel(address: AddressEntity): Prisma.addressCreateInput {
    return {
      id: address.id.value,
      cep: address.cep,
      city: address.city,
      neighborhood: address.neighborhood,
      number: address.number,
      state: address.state,
      street: address.street,
      lat: address.lat,
      long: address.long,
    };
  }

  static toEntity(model: any): AddressEntity {
    return new AddressEntity({
      id: model.id,
      cep: model.cep,
      city: model.city,
      neighborhood: model.neighborhood,
      number: model.number,
      state: model.state,
      street: model.street,
      lat: model.lat,
      long: model.long,
      company: model.company,
      companyCustomer: model.companyCustomer,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    });
  }
}
