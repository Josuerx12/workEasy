import { CompanyEntity } from "@src/core/company/domain/entities/company.entity";
import { CompanyUserRoleEntity } from "@src/core/companyUserRole/domain/entities/companyUserRole.entity";
import { Entity } from "@src/core/shared/entity/entity";
import { Uuid } from "@src/core/shared/valueObjects/uuid.vo";
import { TaskEntity } from "@src/core/task/domain/entities/task.entity";
import { UserEntity } from "@src/core/user/domain/entities/user.entity";

export type CompanyUserEntityProps = {
  id?: string;
  companyId: string;
  userId?: string;
  lat?: string;
  long?: string;

  company?: CompanyEntity;
  user: UserEntity;
  tasks?: TaskEntity[];
  companyUserRoles?: CompanyUserRoleEntity[];

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class CompanyUserEntity extends Entity {
  id?: Uuid;
  companyId: Uuid;
  userId: Uuid;
  lat?: string;
  long?: string;

  company?: CompanyEntity;
  user: UserEntity;
  tasks?: TaskEntity[];
  companyUserRoles?: CompanyUserRoleEntity[];

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor(props: CompanyUserEntityProps) {
    super();

    this.id = new Uuid(props.id);
    this.companyId = new Uuid(props.companyId);
    this.userId = props.userId
      ? new Uuid(props.userId)
      : props.user && new Uuid(props.user.id.value);
    this.lat = props.lat ? props.lat : "0";
    this.long = props.long ? props.long : "0";

    this.company = props.company;
    this.user = props.user;
    this.tasks = props.tasks;
    this.companyUserRoles = props.companyUserRoles;

    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;

    this.validate();
  }

  toJSON() {
    return {
      id: this.id.value,
      companyId: this.companyId?.value,
      userId: this.userId?.value,
      lat: this.lat,
      long: this.long,

      user: this.user?.toJSON(),
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
  validate() {}

  changeLat(value: string) {
    this.lat = value;
    this.validate();
  }

  changeLong(value: string) {
    this.long = value;
    this.validate();
  }
}
