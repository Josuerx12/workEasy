import { db } from "src/infra/dbConn";
import { ICompanyUserRepository } from "../../domain/contracts/companyUserRepository.interface";
import { CompanyUserEntity } from "../../domain/entities/companyUser.entity";
import { CompanyUserModelMapper } from "../models/companyUser.model.mapper";

export class CompanyUserRepository implements ICompanyUserRepository {
  async getCompanyUserByDocumentEmailOrId(
    filter: string
  ): Promise<CompanyUserEntity> {
    const companyUser = await db.companyUser.findFirst({
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

    return companyUser ? CompanyUserModelMapper.toEntity(companyUser) : null;
  }

  getById(id: string): Promise<CompanyUserEntity> {
    throw new Error("Method not implemented.");
  }

  async getAll(): Promise<CompanyUserEntity[]> {
    const companies = await db.companyUser.findMany();

    return companies
      ? companies.map((companyUser) =>
          CompanyUserModelMapper.toEntity(companyUser)
        )
      : null;
  }

  async insert(entity: CompanyUserEntity): Promise<void> {
    await db.companyUser.create({
      data: CompanyUserModelMapper.toModel(entity),
    });

    return;
  }

  async update(entity: CompanyUserEntity): Promise<void> {
    await db.companyUser.update({
      where: { id: entity.id.value },
      data: CompanyUserModelMapper.toModel(entity),
    });

    return;
  }

  async delete(id: string): Promise<void> {
    await db.companyUser.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
