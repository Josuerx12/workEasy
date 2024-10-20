import { RoleEntity } from "../../domain/entities/role.entity";

export type RoleOutput = {
  id: string;
  name: string;
  description: string;
  companyUserRole: any[];

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class RoleOutputMapper {
  static toOutput(roleEntity: RoleEntity): RoleOutput {
    return roleEntity ? roleEntity.toJSON() : null;
  }
}
