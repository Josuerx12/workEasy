import { Prisma } from "@prisma/client";
import { CompanyEntity } from "../../domain/entities/company.entity";

export class CompanyModelMapper {
  static toModel(company: CompanyEntity): Prisma.companyUncheckedCreateInput {
    return {
      id: company.id.value,
      avatarId: company.avatarId?.value,
      email: company.email,
      name: company.name,
      password: company.password,
      document: company.document,
      documentType: company.documentType,
      phone: company.phone,
    };
  }

  static toEntity(model: any): CompanyEntity {
    return new CompanyEntity({
      id: model.id,
      email: model.email,
      name: model.name,
      avatar: model.avatar,
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
