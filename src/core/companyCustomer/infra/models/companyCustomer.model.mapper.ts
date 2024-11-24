import { Prisma } from "@prisma/client";
import { CompanyModelMapper } from "@src/core/company/infra/models/company.model.mapper";
import { TaskModelMapper } from "@src/core/task/infra/models/task.model.mapper";
import { UserModelMapper } from "@src/core/user/infra/models/user.model.mapper";
import { CompanyCustomerEntity } from "../../domain/entities/companyCustomer.entity";
import { AddressModelMapper } from "@src/core/address/infra/models/address.model.mapper";

export class CompanyCustomerModelMapper {
  static toModel(
    companyCustomer: CompanyCustomerEntity
  ): Prisma.companyCustomerCreateInput {
    return {
      id: companyCustomer.id.value,
      document: companyCustomer.document,
      documentType: companyCustomer.documentType,
      phone: companyCustomer.phone,
      name: companyCustomer.name,
      email: companyCustomer.email,
      address: {
        connectOrCreate: {
          where: {
            id: companyCustomer.addressId?.value,
          },
          create: AddressModelMapper.toModel(companyCustomer.address),
        },
      },
      company: {
        connectOrCreate: {
          where: {
            id: companyCustomer.companyId?.value,
          },
          create: CompanyModelMapper.toModel(companyCustomer.company),
        },
      },
    };
  }

  static toEntity(model: any): CompanyCustomerEntity {
    return new CompanyCustomerEntity({
      id: model.id,
      addressId: model.addressId,
      companyId: model.companyId,
      document: model.document,
      documentType: model.documentType,
      name: model.name,
      phone: model.phone,
      email: model.email,
      company: model.company
        ? CompanyModelMapper.toEntity(model.company)
        : null,
      address: model.address
        ? AddressModelMapper.toEntity(model.address)
        : null,

      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    });
  }
}
