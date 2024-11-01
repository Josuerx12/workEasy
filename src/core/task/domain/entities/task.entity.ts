import { CompanyRequesterEntity } from "@src/core/companyRequester/domain/entities/companyRequester.entity";
import { CompanyTaskCategoryEntity } from "@src/core/companyTaskCategory/domain/entities/companyTaskCategory.entity";
import { CompanyUserEntity } from "@src/core/companyUser/domain/entities/companyUser.entity";
import { EvidenceEntity } from "@src/core/evidence/domain/entities/evidence.entity";
import { Entity } from "@src/core/shared/entity/entity";
import { Uuid } from "@src/core/shared/valueObjects/uuid.vo";
import { TaskEntityValidator } from "../validators/task.validator";

export type TaskEntityProps = {
  id?: string;
  companyUserId?: string;
  companyRequesterId: string;
  companyTaskCategoryId: string;
  title: string;
  status: string;
  description: string;

  evidences?: EvidenceEntity[];
  companyUser?: CompanyUserEntity;
  companyTaskCategory?: CompanyTaskCategoryEntity;
  companyRequester?: CompanyRequesterEntity;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class TaskEntity extends Entity {
  id: Uuid;
  companyUserId?: Uuid;
  companyRequesterId: Uuid;
  companyTaskCategoryId: Uuid;
  title: string;
  status: string;
  description: string;

  evidences?: EvidenceEntity[];
  companyUser?: CompanyUserEntity;
  companyTaskCategory?: CompanyTaskCategoryEntity;
  companyRequester?: CompanyRequesterEntity;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  constructor(props: TaskEntityProps) {
    super();

    this.id = new Uuid(props.id);
    this.companyRequesterId = new Uuid(props.companyRequesterId);
    this.companyTaskCategoryId = new Uuid(props.companyTaskCategoryId);
    this.companyUserId = props.companyUserId && new Uuid(props.companyUserId);
    this.title = props.title;
    this.status = props.status;
    this.description = props.description;
    this.evidences = props.evidences;
    this.companyUser = props.companyUser;
    this.companyTaskCategory = props.companyTaskCategory;
    this.companyRequester = props.companyRequester;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;

    this.validate();
  }

  toJSON() {
    return {
      id: this.id.value,
      companyRequesterId: this.companyRequesterId.value,
      companyTaskCategoryId: this.companyTaskCategoryId.value,
      companyUserId: this.companyUserId.value,
      title: this.title,
      status: this.status,
      description: this.description,
      evidences: this.evidences
        ? this.evidences.map((evicence) => evicence.toJSON())
        : null,
      companyUser: this.companyUser?.toJSON(),
      companyTaskCategory: this.companyTaskCategory?.toJSON(),
      companyRequester: this.companyRequester?.toJSON(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
  validate() {
    return new TaskEntityValidator(this).validate();
  }

  addEvidences(entities: EvidenceEntity[]) {
    entities.map((e) => this.evidences.push(e));
  }

  changeTitle(value: string) {
    this.title = value;
    this.validate();
  }

  changeDescription(value: string) {
    this.title = value;
    this.validate();
  }

  changeStatus(value: string) {
    this.title = value;
    this.validate();
  }
}
