import { db } from "@src/infra/dbConn";
import {
  CompanyUserRoleOutputParams,
  CompanyUserRoleInputParams,
  ICompanyUserRoleRepository,
} from "../../domain/contracts/companyUserRoleRepository.interface";
import { CompanyUserRoleEntity } from "../../domain/entities/companyUserRole.entity";
import { CompanyUserRoleModelMapper } from "../models/companyUserRole.model.mapper";

export class CompanyUserRoleRepository implements ICompanyUserRoleRepository {
  async getAll(
    props: CompanyUserRoleInputParams
  ): Promise<CompanyUserRoleOutputParams> {
    const offset = (props.page - 1) * props.perPage;
    const limit = props.perPage;

    const companiesUserRoles = await db.companyUserRole.findMany({
      skip: offset,
      take: limit,
    });
    const totalRecords = await db.companyUserRole.count();

    const totalPages = Math.ceil(totalRecords / limit);

    return new CompanyUserRoleOutputParams({
      currentPage: props.page,
      perPage: props.perPage,
      total: totalPages,
      items: companiesUserRoles.map((cur) =>
        CompanyUserRoleModelMapper.toEntity(cur)
      ),
    });
  }
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
