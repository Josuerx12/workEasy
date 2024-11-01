import { UseCase } from "@src/core/shared/useCase/useCase";
import { ICompanyRepository } from "../../domain/contracts/companyRepository.interface";
import { CompanyOutput, CompanyOutputMapper } from "../shared/company.output";

export type CompanyInput = {
  id: string;
};

export class GetCompanyUseCase implements UseCase<CompanyInput, CompanyOutput> {
  constructor(private readonly companyRepository: ICompanyRepository) {}
  async execute(input: CompanyInput): Promise<CompanyOutput> {
    const companyEntity =
      await this.companyRepository.getCompanyByDocumentEmailOrId(input.id);

    if (!companyEntity) {
      throw new Error("Company not found");
    }

    return CompanyOutputMapper.toOutput(companyEntity);
  }
}
