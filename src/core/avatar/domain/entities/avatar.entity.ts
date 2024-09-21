import { hashSync } from "bcryptjs";
import { CompanyEntity } from "src/core/company/domain/entities/company.entity";
import { Entity } from "src/core/shared/entity/entity";
import { Uuid } from "src/core/shared/valueObjects/uuid.vo";
import { UserEntity } from "src/core/user/domain/entities/user.entity";

export type AvatarEntityProps = {
  id?: string;
  path: string;
  url: string;

  user?: UserEntity[];
  company?: CompanyEntity[];
  companyUser?: any[];
  companyRequester?: any[];

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class AvatarEntity extends Entity {
  id: Uuid;
  path: string;
  url: string;

  user?: UserEntity[];
  company?: CompanyEntity[];
  companyUser?: any[];
  companyRequester?: any[];

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  constructor(props: AvatarEntityProps) {
    super();

    this.id = new Uuid(props.id);
    this.path = props.path;
    this.url = props.url;
    this.user = props.user;
    this.company = props.company;
    this.companyUser = props.companyUser;
    this.companyRequester = props.companyRequester;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;

    this.validate();
  }

  toJSON() {
    return {
      id: this.id.value,
      path: this.path,
      url: this.url,
      user: this.user,
      company: this.company,
      companyUser: this.companyUser,
      companyRequester: this.companyRequester,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
  validate() {}
}
