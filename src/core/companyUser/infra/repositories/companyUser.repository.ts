import { db } from "@src/infra/dbConn";
import {
  CompanyUserOutputParams,
  CompanyUserInputParams,
  ICompanyUserRepository,
} from "../../domain/contracts/companyUserRepository.interface";
import { CompanyUserEntity } from "../../domain/entities/companyUser.entity";
import { CompanyUserModelMapper } from "../models/companyUser.model.mapper";
import { Prisma } from "@prisma/client";

export class CompanyUserRepository implements ICompanyUserRepository {
  async getAll(
    props: CompanyUserInputParams,
    companyId: string
  ): Promise<CompanyUserOutputParams> {
    const offset = (props.page - 1) * props.perPage;
    const limit = props.perPage;

    const filterCondition: Prisma.companyUserWhereInput = {
      OR: [
        {
          company: {
            OR: [
              {
                name: {
                  contains: props.filter,
                },
              },
              {
                document: props.filter?.replace(/\D/g, ""),
              },
            ],
          },
        },
        {
          user: {
            OR: [
              {
                name: {
                  contains: props.filter,
                },
              },
              {
                email: props.filter,
              },
            ],
          },
        },
      ],
      companyId,
    };

    const companyUsers = await db.companyUser.findMany({
      where: props.filter ? filterCondition : { companyId },
      include: {
        company: true,
        companyUserRole: true,
        task: true,
        user: true,
      },
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    const count = await db.companyUser.count({
      where: props.filter ? filterCondition : { companyId },
    });

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
          {
            userId: filter,
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
