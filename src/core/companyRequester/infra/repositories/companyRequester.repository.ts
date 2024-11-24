import { db } from "@src/infra/dbConn";
import {
  CompanyRequesterOutputParams,
  GetAllCompanyRequesterInputParams,
  ICompanyRequesterRepository,
} from "../../domain/contracts/companyRequesterRepository.interface";
import { CompanyRequesterEntity } from "../../domain/entities/companyRequester.entity";
import { CompanyRequesterModelMapper } from "../models/companyRequester.model.mapper";
import { Prisma } from "@prisma/client";

export class CompanyRequesterRepository implements ICompanyRequesterRepository {
  async getAll(
    props: GetAllCompanyRequesterInputParams,
    companyId: string
  ): Promise<CompanyRequesterOutputParams> {
    const offset = (props.page - 1) * props.perPage;
    const limit = props.perPage;

    const filterCondition: Prisma.companyRequesterWhereInput = {
      OR: [
        {
          company: {
            OR: [
              {
                name: {
                  contains: props.filter,
                  mode: "insensitive",
                },
              },
              {
                document: {
                  contains: props.filter.replace(/\D/g, ""),
                },
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
                  mode: "insensitive",
                },
              },
              {
                email: {
                  contains: props.filter,
                  mode: "insensitive",
                },
              },
            ],
          },
        },
      ],
      companyId,
    };

    const companyRequesters = await db.companyRequester.findMany({
      where: props.filter ? filterCondition : { companyId },
      include: {
        user: true,
        company: true,
      },
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
    const count = await db.companyRequester.count({
      where: props.filter ? filterCondition : { companyId },
    });

    const totalPages = Math.ceil(count / limit);

    return new CompanyRequesterOutputParams({
      items: companyRequesters.map((companyRequester) =>
        CompanyRequesterModelMapper.toEntity(companyRequester)
      ),
      currentPage: props.page,
      perPage: props.perPage,
      total: totalPages,
    });
  }
  async getCompanyRequesterByEmailOrId(
    filter: string
  ): Promise<CompanyRequesterEntity> {
    const companyRequester = await db.companyRequester.findFirst({
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
