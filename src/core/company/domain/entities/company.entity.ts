import { hashSync } from "bcryptjs";
import { Entity } from "src/core/shared/entity/entity";
import { Uuid } from "src/core/shared/valueObjects/uuid.vo";
import { CompanyEntityValidator } from "../validators/company.validator";
import { AvatarEntity } from "src/core/avatar/domain/entities/avatar.entity";
import { string } from "zod";
import { UserEntity } from "src/core/user/domain/entities/user.entity";
import { CompanyUserEntity } from "src/core/companyUser/domain/entities/companyUser.entity";
import { CompanyRequesterEntity } from "src/core/companyRequester/domain/entities/companyRequester.entity";
import { CompanyTaskCategoryEntity } from "src/core/companyTaskCategory/domain/entities/companyTaskCategory.entity";
import { AddressEntity } from "src/core/address/domain/entities/address.entity";

export type CompanyEntityProps = {
  id?: string;
  userId: string;
  avatarId?: string;
  addressId?: string;

  name: string;
  documentType: string;
  document: string;
  email: string;
  phone: string;

  avatar?: AvatarEntity;
  address?: AddressEntity;
  user: UserEntity;
  companyUser?: CompanyUserEntity[];
  companyRequester?: CompanyRequesterEntity[];
  companyTaskCategory?: CompanyTaskCategoryEntity[];
  companyClient?: any[];

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class CompanyEntity extends Entity {
  id: Uuid;
  userId: Uuid;
  avatarId?: Uuid;
  addressId?: Uuid;

  name: string;
  documentType: string;
  document: string;
  email: string;
  phone: string;

  avatar?: AvatarEntity;
  address?: AddressEntity;
  user: UserEntity;
  companyUser?: CompanyUserEntity[];
  companyRequester?: CompanyRequesterEntity[];
  companyTaskCategory?: CompanyTaskCategoryEntity[];
  companyClient?: any[];

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor(props: CompanyEntityProps) {
    super();

    this.id = new Uuid(props.id);
    this.userId = new Uuid(props.userId);
    this.avatarId = props.avatarId && new Uuid(props.avatarId);
    this.addressId = props.addressId && new Uuid(props.addressId);

    this.name = props.name;
    this.documentType = props.documentType;
    this.document = props.document;
    this.email = props.email;
    this.phone = props.phone;

    this.avatar = props.avatar;
    this.companyUser = props.companyUser;
    this.companyRequester = props.companyRequester;
    this.companyTaskCategory = props.companyTaskCategory;
    this.companyClient = props.companyClient;

    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;

    this.validate();
  }

  toJSON() {
    return {
      id: this.id.value,
      avatarId: this.avatarId?.value,
      userId: this.userId?.value,
      addressId: this.addressId?.value,

      name: this.name,
      email: this.email,
      document: this.document,
      documentType: this.documentType,
      phone: this.phone,

      avatar: this.avatar?.toJSON(),
      companyUser: this.companyUser?.map((cu) => cu?.toJSON()),
      companyRequester: this.companyRequester?.map((cr) => cr?.toJSON()),
      companyTaskCategory: this.companyTaskCategory?.map((ctc) =>
        ctc?.toJSON()
      ),
      companyClient: this.companyClient,

      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
  validate() {
    return new CompanyEntityValidator({
      document: this.document,
      documentType: this.documentType,
      email: this.email,
      name: this.name,
      phone: this.phone,
    }).validate();
  }

  addAvatar(avatar: AvatarEntity) {
    this.avatar = avatar;
    this.avatarId = avatar.id;
  }

  addAddress(address: AddressEntity) {
    this.address = address;
    this.addressId = address.id;
  }

  changeEmail(value: string) {
    this.email = value;
    this.validate();
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
