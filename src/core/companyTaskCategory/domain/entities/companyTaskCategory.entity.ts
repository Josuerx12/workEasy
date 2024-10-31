import { CompanyEntity } from "src/core/company/domain/entities/company.entity";
import { Entity } from "src/core/shared/entity/entity";
import { Uuid } from "src/core/shared/valueObjects/uuid.vo";
import { CompanyTaskCategoryValidator } from "../validations/companyTaskCategory.validator";

export type CompanyTaskCategoryEntityProps = {
  id?: string;
  companyId: string;
  title: string;
  description: string;

  task?: any[];
  company?: CompanyEntity;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class CompanyTaskCategoryEntity extends Entity {
  id: Uuid;
  companyId: Uuid;
  title: string;
  description: string;

  task: any[];
  company: CompanyEntity;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  constructor(props: CompanyTaskCategoryEntityProps) {
    super();

    this.id = new Uuid(props.id);
    this.companyId = new Uuid(props.companyId);
    this.title = props.title;
    this.description = props.description;
    this.task = props.task;
    this.company = props.company;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;

    this.validate();
  }

  toJSON() {
    return {
      id: this.id.value,
      companyId: this.companyId?.value,
      title: this.title,
      description: this.description,
      task: this.task,
      company: this.company.toJSON(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
  validate() {
    return new CompanyTaskCategoryValidator({
      companyId: this.companyId.value,
      description: this.description,
      title: this.title,
    }).validate();
  }

  changeTitle(value: string) {
    this.title = value;
    this.validate();
  }

  changeDescription(value: string) {
    this.description = value;
    this.validate();
  }
}
