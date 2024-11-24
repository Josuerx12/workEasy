import { AddressEntity } from "@src/core/address/domain/entities/address.entity";
import { AddressModelMapper } from "@src/core/address/infra/models/address.model.mapper";
import { db } from "@src/infra/dbConn";
import {
  CompanyInputParams,
  CompanyOutputParams,
  ICompanyRepository,
} from "../../domain/contracts/companyRepository.interface";
import { CompanyEntity } from "../../domain/entities/company.entity";
import { CompanyModelMapper } from "../models/company.model.mapper";

export class CompanyRepository implements ICompanyRepository {
  async getAll(props: CompanyInputParams): Promise<CompanyOutputParams> {
    const offset = (props.page - 1) * props.perPage;
    const limit = props.perPage;

    const companies = await db.company.findMany({
      where: {
        ...(props.filter?.search && {
          OR: [
            {
              name: {
                contains: props.filter.search,
              },
            },
            {
              document: props.filter.search.replace(/\D/g, ""),
            },
            {
              email: props.filter.search,
            },
          ],
        }),
        ...(props.filter?.city && {
          address: {
            city: {
              contains: props.filter.city,
            },
          },
        }),
        ...(props.filter?.uf && {
          address: {
            state: {
              contains: props.filter.uf,
            },
          },
        }),
      },
      include: {
        address: true,
      },
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalRecords = await db.company.count({
      where: {
        ...(props.filter?.search && {
          OR: [
            {
              name: {
                contains: props.filter.search,
              },
            },
            {
              document: props.filter.search.replace(/\D/g, ""),
            },
            {
              email: props.filter.search,
            },
          ],
        }),
        ...(props.filter?.city && {
          address: {
            city: {
              contains: props.filter.city,
            },
          },
        }),
        ...(props.filter?.uf && {
          address: {
            state: {
              contains: props.filter.uf,
            },
          },
        }),
      },
    });

    const totalPages = Math.ceil(totalRecords / limit);

    return new CompanyOutputParams({
      items: companies.map((company) => CompanyModelMapper.toEntity(company)),
      total: totalPages,
      currentPage: props.page,
      perPage: props.perPage,
    });
  }
  async getCompanyByDocumentEmailOrId(filter: string): Promise<CompanyEntity> {
    const company = await db.company.findFirst({
      where: {
        OR: [
          {
            document: filter?.replace(/\D/g, ""),
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

  async insert(entity: CompanyEntity): Promise<void> {
    await db.company.create({
      data: CompanyModelMapper.toModel(entity),
    });

    entity.address && this.insertAddress(entity.address);

    return;
  }

  private async insertAddress(entity: AddressEntity): Promise<void> {
    await db.address.create({
      data: AddressModelMapper.toModel(entity),
    });

    return;
  }

  private async updateAddress(entity: AddressEntity): Promise<void> {
    await db.address.update({
      where: { id: entity.id.value },
      data: AddressModelMapper.toModel(entity),
    });

    return;
  }

  async update(entity: CompanyEntity): Promise<void> {
    await db.company.update({
      where: { id: entity.id.value },
      data: CompanyModelMapper.toModel(entity),
    });

    if (entity.address) {
      const addressAlreadyExists = await db.address.findUnique({
        where: { id: entity.address.id.value },
      });

      if (!addressAlreadyExists) {
        await this.insertAddress(entity.address);

        return;
      }

      await this.updateAddress(entity.address);
    }

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
