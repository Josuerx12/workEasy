import { hashSync } from "bcryptjs";
import { Entity } from "src/core/shared/entity/entity";
import { Uuid } from "src/core/shared/valueObjects/uuid.vo";
import { AvatarEntity } from "src/core/avatar/domain/entities/avatar.entity";
import { CompanyEntity } from "src/core/company/domain/entities/company.entity";
import { CompanyRequesterEntityValidator } from "../validators/companyRequester.validator";

export type CompanyRequesterEntityProps = {
  id?: string;
  companyId: string;
  avatarId?: string;
  name: string;
  email: string;
  phone?: string;
  password?: string;

  company?: CompanyEntity;
  avatar?: AvatarEntity;
  tasks?: any[];

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class CompanyRequesterEntity extends Entity {
  id?: Uuid;
  companyId: Uuid;
  avatarId?: Uuid;
  name: string;
  email: string;
  phone?: string;
  password?: string;

  company?: CompanyEntity;
  avatar?: AvatarEntity;
  tasks?: any[];

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor(props: CompanyRequesterEntityProps) {
    super();

    this.id = new Uuid(props.id);
    this.companyId = new Uuid(props.companyId);
    this.avatarId = props.avatarId && new Uuid(props.id);

    this.name = props.name;
    this.email = props.email;
    this.phone = props.phone;
    this.password = props.password;

    this.company = props.company;
    this.avatar = props.avatar;
    this.tasks = props.tasks;

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
      phone: this.phone,

      avatar: this.avatar,
      company: this.company,
      tasks: this.tasks,

      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
  validate() {
    return new CompanyRequesterEntityValidator({
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

  changePhone(value: string) {
    this.phone = value;
    this.validate();
  }
}
