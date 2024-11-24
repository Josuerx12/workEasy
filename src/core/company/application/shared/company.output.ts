import { AvatarOutput } from "@src/core/avatar/application/shared/avatar.output";
import { CompanyUserOutput } from "@src/core/companyUser/application/shared/companyUser.output";
import { UserOutput } from "@src/core/user/application/shared/user.output";
import { CompanyEntity } from "../../domain/entities/company.entity";
import { AddressOutput } from "@src/core/address/application/shared/address.output";

export type CompanyOutput = {
  id: string;
  name: string;
  documentType: string;
  document: string;
  email: string;
  phone: string;

  companyUser?: CompanyUserOutput[];
  address?: AddressOutput;
  avatarId?: string;
  avatar?: AvatarOutput;
  user?: UserOutput;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class CompanyOutputMapper {
  static toOutput(companyEntity: CompanyEntity): CompanyOutput {
    return companyEntity ? companyEntity.toJSON() : null;
  }
}
