import { hashSync } from "bcryptjs";
import { Entity } from "src/core/shared/entity/entity";
import { Uuid } from "src/core/shared/valueObjects/uuid.vo";

export type CompanyEntityProps = {
  id?: string;
  name: string;
  documentType: string;
  document: string;
  email: string;
  phone: string;
  password?: string;

  companyUser?: any[];
  avatarId?: string;
  avatar?: any;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class CompanyEntity extends Entity {
  id: Uuid;
  name: string;
  documentType: string;
  document: string;
  email: string;
  phone: string;
  password?: string;

  companyUser?: any[];
  avatarId?: Uuid;
  avatar?: any;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  constructor(props: CompanyEntityProps) {
    super();

    this.id = new Uuid(props.id);
    this.name = props.name;
    this.documentType = props.documentType;
    this.document = props.document;
    this.email = props.email;
    this.phone = props.phone;
    this.password = props.password;
    this.companyUser = props.companyUser;
    this.avatarId = props.avatarId && new Uuid(props.avatarId);
    this.avatar = props.avatar;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;

    this.validate();
    this.hashPassword();
  }

  toJSON() {
    return {
      id: this.id.value,
      avatarId: this.avatarId?.value,
      email: this.email,
      name: this.name,
      document: this.document,
      documentType: this.documentType,
      phone: this.phone,
      avatar: this.avatar,
      companyUser: this.companyUser,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
  validate() {
    throw new Error("Method not implemented.");
  }

  private hashPassword() {
    if (this.password) {
      this.password = hashSync(this.password, 10);
    }
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
}
