import { db } from "@src/infra/dbConn";
import {
  CompanyTaskCategoryOutputParams,
  GetAllCompanyTaskCategoryInputParams,
  ICompanyTaskCategoryRepository,
} from "../../domain/contracts/companyTaskCategoryRepository.interface";
import { CompanyTaskCategoryEntity } from "../../domain/entities/companyTaskCategory.entity";
import { CompanyTaskCategoryModelMapper } from "../models/companyTaskCategory.model.mapper";

export class CompanyTaskCategoryRepository
  implements ICompanyTaskCategoryRepository
{
  async getAll(
    props: GetAllCompanyTaskCategoryInputParams,
    companyId: string
  ): Promise<CompanyTaskCategoryOutputParams> {
    const offset = (props.page - 1) * props.perPage;
    const limit = props.perPage;

    const companyTaskCategorys = await db.companyTaskCategory.findMany({
      where: {
        ...(props.filter && {
          OR: [
            {
              title: {
                contains: props.filter,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: props.filter,
                mode: "insensitive",
              },
            },
          ],
        }),
        companyId,
      },
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
    const count = await db.companyTaskCategory.count({
      where: {
        ...(props.filter && {
          OR: [
            {
              title: {
                contains: props.filter,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: props.filter,
                mode: "insensitive",
              },
            },
          ],
        }),
        companyId,
      },
    });

    const totalPages = Math.ceil(count / limit);

    return new CompanyTaskCategoryOutputParams({
      items: companyTaskCategorys.map((companyTaskCategory) =>
        CompanyTaskCategoryModelMapper.toEntity(companyTaskCategory)
      ),
      currentPage: props.page,
      perPage: props.perPage,
      total: totalPages,
    });
  }

  async getById(id: string): Promise<CompanyTaskCategoryEntity> {
    const companyTaskCategory = await db.companyTaskCategory.findUnique({
      where: { id },
    });

    return companyTaskCategory
      ? CompanyTaskCategoryModelMapper.toEntity(companyTaskCategory)
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
