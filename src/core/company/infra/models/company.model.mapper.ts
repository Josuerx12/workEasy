import { Prisma } from "@prisma/client";
import { AddressModelMapper } from "@src/core/address/infra/models/address.model.mapper";
import { AvatarModelMapper } from "@src/core/avatar/infra/models/avatar.model.mapper";
import { UserModelMapper } from "@src/core/user/infra/models/user.model.mapper";
import { CompanyEntity } from "../../domain/entities/company.entity";

export class CompanyModelMapper {
  static toModel(company: CompanyEntity): Prisma.companyCreateInput {
    return {
      id: company.id.value,
      email: company.email,
      name: company.name,
      document: company.document,
      documentType: company.documentType,
      phone: company.phone,
      user: {
        connectOrCreate: {
          where: {
            id: company.userId?.value,
          },
          create: UserModelMapper.toModel(company.user),
        },
      },
      avatar: (company.avatar || company.avatarId?.value) && {
        connectOrCreate: {
          where: {
            id: company.avatarId?.value,
          },
          create: AvatarModelMapper.toModel(company.avatar),
        },
      },
      address: (company.address || company.addressId?.value) && {
        connectOrCreate: {
          where: {
            id: company.addressId?.value,
          },
          create: AddressModelMapper.toModel(company.address),
        },
      },
    };
  }

  static toEntity(model: any): CompanyEntity {
    return new CompanyEntity({
      id: model.id,
      email: model.email,
      name: model.name,
      userId: model.userId,
      avatar: model.avatar ? AvatarModelMapper.toEntity(model.avatar) : null,
      user: model.user ? UserModelMapper.toEntity(model.user) : null,
      address: model.address
        ? AddressModelMapper.toEntity(model.address)
        : null,
      avatarId: model.avatarId,
      document: model.document,
      documentType: model.documentType,
      phone: model.phone,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    });
  }
}
