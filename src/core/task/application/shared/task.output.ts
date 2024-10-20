import { EvidenceOutput } from "src/core/evidence/application/shared/evidence.output";
import { TaskEntity } from "../../domain/entities/task.entity";
import { CompanyUserOutput } from "src/core/companyUser/application/shared/companyUser.output";
import { CompanyTaskCategoryOutput } from "src/core/companyTaskCategory/application/shared/companyTaskCategory.output";
import { CompanyRequesterOutput } from "src/core/companyRequester/application/shared/companyRequester.output";

export type TaskOutput = {
  id: string;
  companyRequesterId: string;
  companyTaskCategoryId: string;
  companyUserId: string;
  title: string;
  status: string;
  description: string;
  evidences?: EvidenceOutput[];
  companyUser?: CompanyUserOutput;
  companyTaskCategory?: CompanyTaskCategoryOutput;
  companyRequester?: CompanyRequesterOutput;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class TaskOutputMapper {
  static toOutput(taskEntity: TaskEntity): TaskOutput {
    return taskEntity ? taskEntity.toJSON() : null;
  }
}
