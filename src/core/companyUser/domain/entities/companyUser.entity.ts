import { hashSync } from "bcryptjs";
import { Entity } from "src/core/shared/entity/entity";
import { Uuid } from "src/core/shared/valueObjects/uuid.vo";
import { AvatarEntity } from "src/core/avatar/domain/entities/avatar.entity";
import { CompanyUserEntityValidator } from "../validators/companyUser.validator";
import { CompanyEntity } from "src/core/company/domain/entities/company.entity";
import { TaskEntity } from "src/core/task/domain/entities/task.entity";
import { CompanyUserRoleEntity } from "src/core/companyUserRole/domain/entities/companyUserRole.entity";

export type CompanyUserEntityProps = {
  id?: string;
  companyId: string;
  avatarId?: string;
  name: string;
  documentType: string;
  document: string;
  email: string;
  phone: string;
  password?: string;
  lat?: string;
  long?: string;

  company?: CompanyEntity;
  avatar?: AvatarEntity;
  tasks?: any[];
  companyUserRoles?: any[];

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class CompanyUserEntity extends Entity {
  id?: Uuid;
  companyId: Uuid;
  avatarId?: Uuid;
  name: string;
  documentType: string;
  document: string;
  email: string;
  phone: string;
  password?: string;
  lat?: string;
  long?: string;

  company?: CompanyEntity;
  avatar?: AvatarEntity;
  tasks?: TaskEntity[];
  companyUserRoles?: CompanyUserRoleEntity[];

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor(props: CompanyUserEntityProps) {
    super();

    this.id = new Uuid(props.id);
    this.companyId = new Uuid(props.companyId);
    this.avatarId = props.avatarId && new Uuid(props.id);

    this.name = props.name;
    this.documentType = props.documentType;
    this.document = props.document;
    this.email = props.email;
    this.phone = props.phone;
    this.password = props.password;
    this.lat = props.lat;
    this.long = props.long;

    this.company = props.company;
    this.avatar = props.avatar;
    this.tasks = props.tasks;
    this.companyUserRoles = props.companyUserRoles;

    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;

    this.validate();
    this.hashPassword();
  }

  toJSON() {
    return {
      id: this.id.value,
      companyId: this.companyId.value,
      avatarId: this.avatarId?.value,

      email: this.email,
      name: this.name,
      document: this.document,
      documentType: this.documentType,
      phone: this.phone,
      lat: this.lat,
      long: this.long,

      avatar: this.avatar?.toJSON(),
      company: this.company?.toJSON(),
      companyUserRoles: this.companyUserRoles
        ? this.companyUserRoles.map((r) => r.toJSON())
        : null,
      tasks: this.tasks ? this.tasks.map((t) => t.toJSON()) : null,

      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
  validate() {
    return new CompanyUserEntityValidator({
      document: this.document,
      documentType: this.documentType,
      email: this.email,
      name: this.name,
      password: this.password,
      phone: this.phone,
    }).validate();
  }

  private hashPassword() {
    if (this.password) {
      this.password = hashSync(this.password, 10);
    }
  }

  addAvatar(avatar: AvatarEntity) {
    this.avatar = avatar;
    this.avatarId = avatar.id;
  }

  changeEmail(value: string) {
    this.email = value;
    this.validate();
  }

  changePassword(value: string) {
    this.password = value;
    this.validate();
    this.hashPassword();
  }

  changeName(value: string) {
    this.name = value;
    this.validate();
  }

  changeDocument(value: string) {
    this.document = value;
    this.validate();
  }

  changeDocumentType(value: string) {
    this.documentType = value;
    this.validate();
  }

  changePhone(value: string) {
    this.phone = value;
    this.validate();
  }

  changeLat(value: string) {
    this.lat = value;
    this.validate();
  }

  changeLong(value: string) {
    this.long = value;
    this.validate();
  }
}
