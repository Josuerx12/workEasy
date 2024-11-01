import { db } from "@src/infra/dbConn";
import { ICompanyRequesterRepository } from "../../domain/contracts/companyRequesterRepository.interface";
import { CompanyRequesterEntity } from "../../domain/entities/companyRequester.entity";
import { CompanyRequesterModelMapper } from "../models/companyRequester.model.mapper";

export class CompanyRequesterRepository implements ICompanyRequesterRepository {
  async getCompanyRequesterByEmailOrId(
    filter: string
  ): Promise<CompanyRequesterEntity> {
    const companyRequester = await db.companyRequester.findFirst({
      where: {
        OR: [
          {
            id: filter,
          },
        ],
      },
      include: {
        user: true,
        company: true,
      },
    });

    return companyRequester
      ? CompanyRequesterModelMapper.toEntity(companyRequester)
      : null;
  }

  getById(id: string): Promise<CompanyRequesterEntity> {
    throw new Error("Method not implemented.");
  }

  async getAll(): Promise<CompanyRequesterEntity[]> {
    const companies = await db.companyRequester.findMany({
      include: {
        user: true,
        company: true,
      },
    });

    return companies
      ? companies.map((companyRequester) =>
          CompanyRequesterModelMapper.toEntity(companyRequester)
        )
      : null;
  }

  async insert(entity: CompanyRequesterEntity): Promise<void> {
    await db.companyRequester.create({
      data: CompanyRequesterModelMapper.toModel(entity),
    });

    return;
  }

  async update(entity: CompanyRequesterEntity): Promise<void> {
    await db.companyRequester.update({
      where: { id: entity.id.value },
      data: CompanyRequesterModelMapper.toModel(entity),
    });

    return;
  }

  async delete(id: string): Promise<void> {
    await db.companyRequester.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
