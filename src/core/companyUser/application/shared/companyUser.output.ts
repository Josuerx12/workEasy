import {
  AvatarOutput,
  AvatarOutputMapper,
} from "src/core/avatar/application/shared/avatar.output";
import { CompanyUserEntity } from "../../domain/entities/companyUser.entity";
import {
  CompanyOutput,
  CompanyOutputMapper,
} from "src/core/company/application/shared/company.output";

export type CompanyUserOutput = {
  id: string;
  companyId: string;
  avatarId?: string;

  name: string;
  documentType: string;
  document: string;
  email: string;
  phone: string;
  lat: string;
  long: string;

  company?: CompanyOutput;
  avatar?: AvatarOutput;
  companyUserRoles?: any[];
  tasks?: any[];

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class CompanyUserOutputMapper {
  static toOutput(companyUserEntity: CompanyUserEntity): CompanyUserOutput {
    return {
      ...companyUserEntity.toJSON(),
      company: companyUserEntity.company
        ? CompanyOutputMapper.toOutput(companyUserEntity.company)
        : null,
      avatar: companyUserEntity.avatar
        ? AvatarOutputMapper.toOutput(companyUserEntity.avatar)
        : null,
    };
  }
}
