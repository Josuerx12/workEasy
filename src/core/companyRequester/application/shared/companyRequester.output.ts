import {
  AvatarOutput,
  AvatarOutputMapper,
} from "src/core/avatar/application/shared/avatar.output";
import {
  CompanyOutput,
  CompanyOutputMapper,
} from "src/core/company/application/shared/company.output";
import { CompanyRequesterEntity } from "../../domain/entities/companyRequester.entity";

export type CompanyRequesterOutput = {
  id: string;
  companyId: string;
  avatarId?: string;

  name: string;
  email: string;
  phone?: string;
  password?: string;

  company?: CompanyOutput;
  avatar?: AvatarOutput;
  tasks?: any[];

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class CompanyRequesterOutputMapper {
  static toOutput(
    companyRequesterEntity: CompanyRequesterEntity
  ): CompanyRequesterOutput {
    return {
      ...companyRequesterEntity.toJSON(),
      company: companyRequesterEntity.company
        ? CompanyOutputMapper.toOutput(companyRequesterEntity.company)
        : null,
      avatar: companyRequesterEntity.avatar
        ? AvatarOutputMapper.toOutput(companyRequesterEntity.avatar)
        : null,
    };
  }
}
