import { Entity } from "src/core/shared/entity/entity";
import { Uuid } from "src/core/shared/valueObjects/uuid.vo";
import { UserEntityValidator } from "../validators/user.validator";
import { hashSync } from "bcryptjs";
import { AvatarEntity } from "src/core/avatar/domain/entities/avatar.entity";

export type UserEntityProps = {
  id?: string;
  avatarId?: string;
  name: string;
  email: string;
  password?: string;
  admin?: boolean;
  moderator?: boolean;
  support?: boolean;
  avatar?: any;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class UserEntity extends Entity {
  id?: Uuid;
  avatarId?: Uuid;
  email: string;
  name: string;
  password?: string;
  admin: boolean;
  moderator: boolean;
  support: boolean;
  avatar?: AvatarEntity;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor(props: UserEntityProps) {
    super();

    this.id = new Uuid(props.id);
    this.avatarId = props.avatarId && new Uuid(props.avatarId);
    this.email = props.email;
    this.name = props.name;
    this.password = props.password;
    this.admin = props.admin != undefined ? props.admin : false;
    this.moderator = props.moderator != undefined ? props.moderator : false;
    this.support = props.support != undefined ? props.support : false;
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
      admin: this.admin,
      moderator: this.moderator,
      support: this.support,
      avatar: this.avatar,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
  validate() {
    return new UserEntityValidator({
      name: this.name,
      password: this.password,
      email: this.email,
    }).validate();
  }
  private hashPassword() {
    if (this.password) {
      this.password = hashSync(this.password, 10);
    }
  }

  addAvatar(avatarEntity: AvatarEntity) {
    this.avatarId = avatarEntity.id;
    this.avatar = avatarEntity;
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

  changeSupport(value: boolean) {
    this.support = value;
  }

  changeModerator(value: boolean) {
    this.moderator = value;
  }

  changeAdmin(value: boolean) {
    this.admin = value;
  }
}
