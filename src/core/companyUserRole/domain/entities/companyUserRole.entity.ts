import { CompanyUserEntity } from "@src/core/companyUser/domain/entities/companyUser.entity";
import { RoleEntity } from "@src/core/role/domain/entities/role.entity";
import { Entity } from "@src/core/shared/entity/entity";
import { Uuid } from "@src/core/shared/valueObjects/uuid.vo";

export type CompanyUserRoleEntityProps = {
  id?: string;
  companyUserId: string;
  roleId: string;

  companyUser?: CompanyUserEntity;
  role?: RoleEntity;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class CompanyUserRoleEntity extends Entity {
  id: Uuid;
  companyUserId: Uuid;
  roleId: Uuid;

  companyUser: CompanyUserEntity;
  role: RoleEntity;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor(props: CompanyUserRoleEntityProps) {
    super();

    this.id = new Uuid(props.id);
    this.companyUserId = new Uuid(props.companyUserId);
    this.roleId = new Uuid(props.roleId);

    this.companyUser = props.companyUser;
    this.role = props.role;

    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }

  toJSON() {
    return {
      id: this.id.value,
      companyUserId: this.companyUserId.value,
      roleId: this.roleId?.value,

      companyUser: this.companyUser.toJSON(),
      role: this.role.toJSON(),

      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
  validate() {}
}
