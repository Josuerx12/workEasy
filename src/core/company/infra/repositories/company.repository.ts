import { db } from "src/infra/dbConn";
import { ICompanyRepository } from "../../domain/contracts/companyRepository.interface";
import { CompanyEntity } from "../../domain/entities/company.entity";
import { CompanyModelMapper } from "../models/company.model.mapper";

export class CompanyRepository implements ICompanyRepository {
  async getCompanyByDocumentEmailOrId(filter: string): Promise<CompanyEntity> {
    const company = await db.company.findFirst({
      where: {
        OR: [
          {
            document: filter,
          },
          {
            email: filter,
          },
          {
            id: filter,
          },
        ],
      },
    });

    return company ? CompanyModelMapper.toEntity(company) : null;
  }

  getById(id: string): Promise<CompanyEntity> {
    throw new Error("Method not implemented.");
  }

  async getAll(): Promise<CompanyEntity[]> {
    const companies = await db.company.findMany();

    return companies
      ? companies.map((company) => CompanyModelMapper.toEntity(company))
      : null;
  }

  async insert(entity: CompanyEntity): Promise<void> {
    await db.company.create({
      data: CompanyModelMapper.toModel(entity),
    });

    return;
  }

  async update(entity: CompanyEntity): Promise<void> {
    await db.company.update({
      where: { id: entity.id.value },
      data: CompanyModelMapper.toModel(entity),
    });

    return;
  }

  async delete(id: string): Promise<void> {
    await db.company.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
