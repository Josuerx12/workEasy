import { Prisma } from "@prisma/client";
import { CompanyModelMapper } from "src/core/company/infra/models/company.model.mapper";
import { AvatarModelMapper } from "src/core/avatar/infra/models/avatar.model.mapper";
import { CompanyRequesterEntity } from "../../domain/entities/companyRequester.entity";
import { UserModelMapper } from "src/core/user/infra/models/user.model.mapper";
import { TaskModelMapper } from "src/core/task/infra/models/task.model.mapper";

export class CompanyRequesterModelMapper {
  static toModel(
    companyRequester: CompanyRequesterEntity
  ): Prisma.companyRequesterUncheckedCreateInput {
    return {
      id: companyRequester.id.value,
      userId: companyRequester.userId?.value,
      companyId: companyRequester.companyId.value,
    };
  }

  static toEntity(model: any): CompanyRequesterEntity {
    return new CompanyRequesterEntity({
      id: model.id,
      userId: model.userId,
      companyId: model.companyId,
      company: model.company
        ? CompanyModelMapper.toEntity(model.company)
        : null,
      tasks: model.tasks
        ? model.tasks.map((task) => TaskModelMapper.toEntity(task))
        : null,
      user: model.user ? UserModelMapper.toEntity(model.user) : null,

      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    });
  }
}
