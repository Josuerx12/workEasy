import {
  AvatarOutput,
  AvatarOutputMapper,
} from "src/core/avatar/application/shared/avatar.output";
import {
  CompanyOutput,
  CompanyOutputMapper,
} from "src/core/company/application/shared/company.output";
import { CompanyRequesterEntity } from "../../domain/entities/companyRequester.entity";
import {
  UserOutput,
  UserOutputMapper,
} from "src/core/user/application/shared/user.output";
import {
  TaskOutput,
  TaskOutputMapper,
} from "src/core/task/application/shared/task.output";

export type CompanyRequesterOutput = {
  id: string;
  companyId: string;
  userId: string;

  company?: CompanyOutput;
  user?: UserOutput;
  tasks?: TaskOutput[];

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class CompanyRequesterOutputMapper {
  static toOutput(
    companyRequesterEntity: CompanyRequesterEntity
  ): CompanyRequesterOutput {
    return companyRequesterEntity
      ? {
          ...companyRequesterEntity.toJSON(),
          company: companyRequesterEntity.company
            ? CompanyOutputMapper.toOutput(companyRequesterEntity.company)
            : null,
          user: companyRequesterEntity.user
            ? UserOutputMapper.toOutput(companyRequesterEntity.user)
            : null,
          tasks: companyRequesterEntity.tasks
            ? companyRequesterEntity.tasks.map((task) =>
                TaskOutputMapper.toOutput(task)
              )
            : null,
        }
      : null;
  }
}
