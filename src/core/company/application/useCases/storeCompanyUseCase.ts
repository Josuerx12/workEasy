import { UseCase } from "src/core/shared/useCase/useCase";
import { CompanyOutput, CompanyOutputMapper } from "../shared/company.output";
import { ICompanyRepository } from "../../domain/contracts/companyRepository.interface";
import { CompanyEntity } from "../../domain/entities/company.entity";

export type StoreCompanyInput = {
  name: string;
  documentType: string;
  document: string;
  email: string;
  phone: string;
  password: string;
};

export class StoreCompanyUseCase
  implements UseCase<StoreCompanyInput, CompanyOutput>
{
  constructor(private readonly companyRepository: ICompanyRepository) {}

  async execute(input: StoreCompanyInput): Promise<CompanyOutput> {
    await this.verifyExistingMailAndDocument(input.email, input.document);

    const company = new CompanyEntity(input);

    await this.companyRepository.insert(company);

    return CompanyOutputMapper.toOutput(company);
  }

  private async verifyExistingMailAndDocument(email: string, document: string) {
    const companyEmail =
      await this.companyRepository.getCompanyByDocumentEmailOrId(email);
    const companyDocument =
      await this.companyRepository.getCompanyByDocumentEmailOrId(document);

    if (companyEmail) {
      throw new Error("Empresa com e-mail informado já cadastrado!");
    }

    if (companyDocument) {
      throw new Error("Empresa com documento informado já cadastrado!");
    }
  }
}
