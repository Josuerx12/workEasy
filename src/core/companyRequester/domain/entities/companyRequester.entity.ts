import { CompanyEntity } from "@src/core/company/domain/entities/company.entity";
import { Entity } from "@src/core/shared/entity/entity";
import { Uuid } from "@src/core/shared/valueObjects/uuid.vo";
import { TaskEntity } from "@src/core/task/domain/entities/task.entity";
import { UserEntity } from "@src/core/user/domain/entities/user.entity";

export type CompanyRequesterEntityProps = {
  id?: string;
  companyId: string;
  userId: string;

  company?: CompanyEntity;
  user?: UserEntity;
  tasks?: TaskEntity[];

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class CompanyRequesterEntity extends Entity {
  id?: Uuid;
  companyId: Uuid;
  userId: Uuid;

  company?: CompanyEntity;
  user?: UserEntity;
  tasks?: TaskEntity[];

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor(props: CompanyRequesterEntityProps) {
    super();

    this.id = new Uuid(props.id);
    this.companyId = new Uuid(props.companyId);
    this.userId = new Uuid(props.userId);

    this.company = props.company;
    this.user = props.user;
    this.tasks = props.tasks;

    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;

    this.validate();
  }

  toJSON() {
    return {
      id: this.id.value,
      companyId: this.companyId.value,
      userId: this.userId?.value,

      user: this.user,
      company: this.company,
      tasks: this.tasks,

      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
  validate() {}
}
