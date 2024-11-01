import {
  CompanyOutput,
  CompanyOutputMapper,
} from "@src/core/company/application/shared/company.output";
import {
  CompanyUserRoleOutput,
  CompanyUserRoleOutputMapper,
} from "@src/core/companyUserRole/application/shared/companyUserRole.output";
import {
  TaskOutput,
  TaskOutputMapper,
} from "@src/core/task/application/shared/task.output";
import {
  UserOutput,
  UserOutputMapper,
} from "@src/core/user/application/shared/user.output";
import { CompanyUserEntity } from "../../domain/entities/companyUser.entity";

export type CompanyUserOutput = {
  id: string;
  companyId: string;
  userId: string;
  lat: string;
  long: string;

  company?: CompanyOutput;
  user?: UserOutput;
  companyUserRoles?: CompanyUserRoleOutput[];
  tasks?: TaskOutput[];

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class CompanyUserOutputMapper {
  static toOutput(companyUserEntity: CompanyUserEntity): CompanyUserOutput {
    return companyUserEntity
      ? {
          ...companyUserEntity.toJSON(),
          company: companyUserEntity.company
            ? CompanyOutputMapper.toOutput(companyUserEntity.company)
            : null,
          user: companyUserEntity.user
            ? UserOutputMapper.toOutput(companyUserEntity.user)
            : null,
          tasks: companyUserEntity.tasks
            ? companyUserEntity.tasks.map((t) => TaskOutputMapper.toOutput(t))
            : null,
          companyUserRoles: companyUserEntity.companyUserRoles
            ? companyUserEntity.companyUserRoles.map((c) =>
                CompanyUserRoleOutputMapper.toOutput(c)
              )
            : null,
        }
      : null;
  }
}
