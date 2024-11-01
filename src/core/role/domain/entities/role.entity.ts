import { Entity } from "@src/core/shared/entity/entity";
import { Uuid } from "@src/core/shared/valueObjects/uuid.vo";

export type RoleEntityProps = {
  id?: string;
  name: string;
  description: string;

  companyUserRole?: any[];

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class RoleEntity extends Entity {
  id: Uuid;
  name: string;
  description: string;
  companyUserRole?: any[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  constructor(props: RoleEntityProps) {
    super();

    this.id = new Uuid(props.id);
    this.name = props.name;
    this.description = props.description;
    this.companyUserRole = props.companyUserRole;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;

    this.validate();
  }

  toJSON() {
    return {
      id: this.id.value,
      name: this.name,
      description: this.description,
      companyUserRole: this.companyUserRole,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  changeName(value: string) {
    this.name = value;
  }

  changeDescription(value: string) {
    this.description = value;
  }

  validate() {}
}
