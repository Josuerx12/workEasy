import { db } from "src/infra/dbConn";
import { ICompanyTaskCategoryRepository } from "../../domain/contracts/companyTaskCategoryRepository.interface";
import { CompanyTaskCategoryEntity } from "../../domain/entities/companyTaskCategory.entity";
import { CompanyTaskCategoryModelMapper } from "../models/companyTaskCategory.model.mapper";

export class CompanyTaskCategoryRepository
  implements ICompanyTaskCategoryRepository
{
  async getById(id: string): Promise<CompanyTaskCategoryEntity> {
    const companyTaskCategory = await db.companyTaskCategory.findUnique({
      where: { id },
    });

    return companyTaskCategory
      ? CompanyTaskCategoryModelMapper.toEntity(companyTaskCategory)
      : null;
  }

  async getAll(): Promise<CompanyTaskCategoryEntity[]> {
    const companyTaskCategorys = await db.companyTaskCategory.findMany();

    return companyTaskCategorys
      ? companyTaskCategorys.map((companyTaskCategory) =>
          CompanyTaskCategoryModelMapper.toEntity(companyTaskCategory)
        )
      : null;
  }

  async insert(entity: CompanyTaskCategoryEntity): Promise<void> {
    await db.companyTaskCategory.create({
      data: CompanyTaskCategoryModelMapper.toModel(entity),
    });

    return;
  }

  async update(entity: CompanyTaskCategoryEntity): Promise<void> {
    await db.companyTaskCategory.update({
      where: { id: entity.id.value },
      data: CompanyTaskCategoryModelMapper.toModel(entity),
    });

    return;
  }

  async delete(id: string): Promise<void> {
    await db.companyTaskCategory.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
