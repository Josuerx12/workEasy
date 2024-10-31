import { AvatarOutput } from "@src/core/avatar/application/shared/avatar.output";
import { CompanyEntity } from "../../domain/entities/company.entity";
import { CompanyUserOutput } from "@src/core/companyUser/application/shared/companyUser.output";
import { UserOutput } from "@src/core/user/application/shared/user.output";

export type CompanyOutput = {
  id: string;
  name: string;
  documentType: string;
  document: string;
  email: string;
  phone: string;

  companyUser?: CompanyUserOutput[];
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
