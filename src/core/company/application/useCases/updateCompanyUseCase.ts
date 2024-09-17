import { UseCase } from "src/core/shared/useCase/useCase";
import { CompanyOutput, CompanyOutputMapper } from "../shared/company.output";
import { ICompanyRepository } from "../../domain/contracts/companyRepository.interface";

export type UpdateCompanyInput = {
  id: string;
  name?: string;
  documentType?: string;
  document?: string;
  email?: string;
  phone?: string;
  password?: string;
};

export class UpdateCompanyUseCase
  implements UseCase<UpdateCompanyInput, CompanyOutput>
{
  constructor(private readonly companyRepository: ICompanyRepository) {}

  async execute(input: UpdateCompanyInput): Promise<CompanyOutput> {
    await this.verifyExistingMailOrDocument(input.email, input.document);

    const companyEntity =
      await this.companyRepository.getCompanyByDocumentEmailOrId(input.id);

    input.name && companyEntity.changeName(input.name);
    input.document && companyEntity.changeDocument(input.document);
    input.documentType && companyEntity.changeDocumentType(input.documentType);
    input.email && companyEntity.changeEmail(input.email);
    input.phone && companyEntity.changePhone(input.phone);
    input.password && companyEntity.changePassword(input.password);

    await this.companyRepository.update(companyEntity);

    return CompanyOutputMapper.toOutput(companyEntity);
  }

  private async verifyExistingMailOrDocument(
    email?: string,
    document?: string
  ) {
    if (email) {
      const companyEmail =
        await this.companyRepository.getCompanyByDocumentEmailOrId(email);

      if (companyEmail) {
        throw new Error("Empresa com e-mail informado já cadastrado!");
      }
    }

    if (document) {
      const companyDocument =
        await this.companyRepository.getCompanyByDocumentEmailOrId(document);

      if (companyDocument) {
        throw new Error("Empresa com documento informado já cadastrado!");
      }
    }
  }
}
