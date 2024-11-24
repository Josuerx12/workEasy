import { AddressEntity } from "@src/core/address/domain/entities/address.entity";
import { AvatarEntity } from "@src/core/avatar/domain/entities/avatar.entity";
import { CompanyRequesterEntity } from "@src/core/companyRequester/domain/entities/companyRequester.entity";
import { CompanyTaskCategoryEntity } from "@src/core/companyTaskCategory/domain/entities/companyTaskCategory.entity";
import { CompanyUserEntity } from "@src/core/companyUser/domain/entities/companyUser.entity";
import { Entity } from "@src/core/shared/entity/entity";
import { Uuid } from "@src/core/shared/valueObjects/uuid.vo";
import { UserEntity } from "@src/core/user/domain/entities/user.entity";
import { CompanyEntityValidator } from "../validators/company.validator";
import { CompanyCustomerEntity } from "@src/core/companyCustomer/domain/entities/companyCustomer.entity";

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
  companyCustomer?: CompanyCustomerEntity[];

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
  companyCustomer?: CompanyCustomerEntity[];

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
    this.email = props.email;
    this.document = props.document?.replace(/\D/g, "");
    this.phone = props.phone?.replace(/\D/g, "");

    this.avatar = props.avatar;
    this.user = props.user;
    this.address = props.address;
    this.companyUser = props.companyUser;
    this.companyRequester = props.companyRequester;
    this.companyTaskCategory = props.companyTaskCategory;
    this.companyCustomer = props.companyCustomer;

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
      user: this.user?.toJSON(),
      companyUser: this.companyUser?.map((cu) => cu?.toJSON()),
      address: this.address?.toJSON(),
      companyRequester: this.companyRequester?.map((cr) => cr?.toJSON()),
      companyTaskCategory: this.companyTaskCategory?.map((ctc) =>
        ctc?.toJSON()
      ),
      companyCustomer: this.companyCustomer?.map((cc) => cc.toJSON()),

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
