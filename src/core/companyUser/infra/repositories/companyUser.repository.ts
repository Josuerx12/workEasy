import { db } from "@src/infra/dbConn";
import {
  CompanyUserOutputParams,
  GetAllCompanyUserInputParams,
  ICompanyUserRepository,
} from "../../domain/contracts/companyUserRepository.interface";
import { CompanyUserEntity } from "../../domain/entities/companyUser.entity";
import { CompanyUserModelMapper } from "../models/companyUser.model.mapper";

export class CompanyUserRepository implements ICompanyUserRepository {
  async getAll(
    props: GetAllCompanyUserInputParams
  ): Promise<CompanyUserOutputParams> {
    const offset = (props.page - 1) * props.perPage;
    const limit = props.perPage;

    const companyUsers = await db.companyUser.findMany({
      include: {
        company: true,
        companyUserRole: true,
        task: true,
        user: true,
      },
      skip: offset,
      take: limit,
    });
    const count = await db.companyUser.count();

    const totalPages = Math.ceil(count / limit);

    return new CompanyUserOutputParams({
      currentPage: props.page,
      perPage: props.perPage,
      items: companyUsers.map((cu) => CompanyUserModelMapper.toEntity(cu)),
      total: totalPages,
    });
  }
  async getCompanyUserByDocumentEmailOrId(
    filter: string
  ): Promise<CompanyUserEntity> {
    const companyUser = await db.companyUser.findFirst({
      where: {
        OR: [
          {
            id: filter,
          },
        ],
      },
      include: {
        company: true,
        companyUserRole: true,
        task: true,
        user: true,
      },
    });

    return companyUser ? CompanyUserModelMapper.toEntity(companyUser) : null;
  }

  getById(id: string): Promise<CompanyUserEntity> {
    throw new Error("Method not implemented.");
  }

  async insert(entity: CompanyUserEntity): Promise<void> {
    await db.companyUser.create({
      data: CompanyUserModelMapper.toModel(entity),
    });
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
