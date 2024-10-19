import { Prisma } from "@prisma/client";
import { CompanyEntity } from "../../domain/entities/company.entity";
import { UserModelMapper } from "src/core/user/infra/models/user.model.mapper";

export class CompanyModelMapper {
  static toModel(company: CompanyEntity): Prisma.companyUncheckedCreateInput {
    return {
      id: company.id.value,
      avatarId: company.avatarId?.value,
      email: company.email,
      name: company.name,
      document: company.document,
      documentType: company.documentType,
      phone: company.phone,
      userId: company.userId.value,
    };
  }

  static toEntity(model: any): CompanyEntity {
    return new CompanyEntity({
      id: model.id,
      email: model.email,
      name: model.name,
      avatar: model.avatar,
      userId: model.userId,
      user: model.user ? UserModelMapper.toEntity(model.user) : null,
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
