import { db } from "@src/infra/dbConn";
import { ICompanyUserRoleRepository } from "../../domain/contracts/companyUserRoleRepository.interface";
import { CompanyUserRoleEntity } from "../../domain/entities/companyUserRole.entity";
import { CompanyUserRoleModelMapper } from "../models/companyUserRole.model.mapper";

export class CompanyUserRoleRepository implements ICompanyUserRoleRepository {
  async getById(id: string): Promise<CompanyUserRoleEntity> {
    const companyUserRole = await db.companyUserRole.findUnique({
      where: {
        id,
      },
    });

    return companyUserRole
      ? CompanyUserRoleModelMapper.toEntity(companyUserRole)
      : null;
  }

  async getAll(): Promise<CompanyUserRoleEntity[]> {
    const companies = await db.companyUserRole.findMany();

    return companies
      ? companies.map((companyUserRole) =>
          CompanyUserRoleModelMapper.toEntity(companyUserRole)
        )
      : null;
  }

  async insert(entity: CompanyUserRoleEntity): Promise<void> {
    await db.companyUserRole.create({
      data: CompanyUserRoleModelMapper.toModel(entity),
    });

    return;
  }

  async update(entity: CompanyUserRoleEntity): Promise<void> {
    return;
  }

  async delete(id: string): Promise<void> {
    await db.companyUserRole.delete({
      where: { id },
    });
  }
}
