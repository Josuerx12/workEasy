import { CompanyEntity } from "../../domain/entities/company.entity";

export type CompanyOutput = {
  id: string;
  name: string;
  documentType: string;
  document: string;
  email: string;
  phone: string;

  companyUser?: any[];
  avatarId?: string;
  avatar?: any;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class CompanyOutputMapper {
  static toOutput(companyEntity: CompanyEntity): CompanyOutput {
    return companyEntity.toJSON();
  }
}
