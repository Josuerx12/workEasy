import { db } from "@src/infra/dbConn";
import {
  ICompanyCustomerRepository,
  GetAllCompanyCustomerInputParams,
  CompanyCustomerOutputParams,
} from "../../domain/contracts/companyCustomerRepository.interface";
import { CompanyCustomerEntity } from "../../domain/entities/companyCustomer.entity";
import { CompanyCustomerModelMapper } from "../models/companyCustomer.model.mapper";

export class CompanyCustomerRepository implements ICompanyCustomerRepository {
  async getAll(
    props: GetAllCompanyCustomerInputParams,
    companyId: string
  ): Promise<CompanyCustomerOutputParams> {
    const offset = (props.page - 1) * props.perPage;
    const limit = props.perPage;

    const companyCustomers = await db.companyCustomer.findMany({
      where: {
        ...(props.filter && {
          OR: [
            { id: props.filter },
            {
              document: {
                contains: props.filter?.replace(/\D/g, ""),
              },
            },
            {
              name: {
                contains: props.filter,
                mode: "insensitive",
              },
            },
          ],
        }),
        companyId,
      },
      include: {
        address: true,
        company: true,
      },
      skip: offset,
      take: limit,
    });
    const count = await db.companyCustomer.count();

    const totalPages = Math.ceil(count / limit);

    return new CompanyCustomerOutputParams({
      items: companyCustomers.map((companyCustomer) =>
        CompanyCustomerModelMapper.toEntity(companyCustomer)
      ),
      currentPage: props.page,
      perPage: props.perPage,
      total: totalPages,
    });
  }
  async getCompanyCustomer(
    filter: string,
    companyId: string
  ): Promise<CompanyCustomerEntity> {
    const companyCustomer = await db.companyCustomer.findFirst({
      where: {
        OR: [
          {
            id: filter,
          },
          {
            email: filter,
          },
          {
            document: filter?.replace(/\D/g, ""),
          },
        ],
        AND: [{ companyId }],
      },
      include: {
        address: true,
        company: true,
      },
    });

    return companyCustomer
      ? CompanyCustomerModelMapper.toEntity(companyCustomer)
      : null;
  }

  async getById(id: string): Promise<CompanyCustomerEntity> {
    const companyCustomer = await db.companyCustomer.findFirst({
      where: {
        id,
      },
      include: {
        address: true,
        company: true,
      },
    });

    return companyCustomer
      ? CompanyCustomerModelMapper.toEntity(companyCustomer)
      : null;
  }

  async insert(entity: CompanyCustomerEntity): Promise<void> {
    await db.companyCustomer.create({
      data: CompanyCustomerModelMapper.toModel(entity),
    });
  }

  async update(entity: CompanyCustomerEntity): Promise<void> {
    await db.companyCustomer.update({
      where: { id: entity.id.value },
      data: CompanyCustomerModelMapper.toModel(entity),
    });
  }

  async delete(id: string): Promise<void> {
    await db.companyCustomer.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
