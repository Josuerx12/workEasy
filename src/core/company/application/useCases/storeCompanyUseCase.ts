import { UseCase } from "src/core/shared/useCase/useCase";
import { CompanyOutput, CompanyOutputMapper } from "../shared/company.output";
import { ICompanyRepository } from "../../domain/contracts/companyRepository.interface";
import { CompanyEntity } from "../../domain/entities/company.entity";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { AvatarEntity } from "src/core/avatar/domain/entities/avatar.entity";
import s3 from "src/infra/s3Client";

export type StoreCompanyInput = {
  name: string;
  documentType: string;
  document: string;
  email: string;
  phone: string;
  password: string;
  file?: Express.Multer.File;
};

export class StoreCompanyUseCase
  implements UseCase<StoreCompanyInput, CompanyOutput>
{
  constructor(private readonly companyRepository: ICompanyRepository) {}

  async execute(input: StoreCompanyInput): Promise<CompanyOutput> {
    await this.verifyExistingMailAndDocument(input.email, input.document);

    const company = new CompanyEntity(input);

    input.file && this.uploadAndUpdateAvatar(company, input.file);

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

  private async uploadAndUpdateAvatar(
    company: CompanyEntity,
    file: Express.Multer.File
  ) {
    if (company.avatar) {
      const s3DeleteObjectCommand = new DeleteObjectCommand({
        Bucket: process.env.AVATAR_BUCKET,
        Key: company.avatar.path,
      });

      await s3.send(s3DeleteObjectCommand);
    }

    const optimizedImageBuffer = await sharp(file.buffer)
      .resize(512, 512)
      .jpeg({ quality: 80 })
      .toBuffer();

    const s3Command = new PutObjectCommand({
      Key: file.filename + ".jpeg",
      Bucket: process.env.AVATAR_BUCKET,
      Body: optimizedImageBuffer,
      ContentType: "image/jpeg",
    });

    await s3.send(s3Command);

    company.addAvatar(
      new AvatarEntity({
        path: file.filename + "." + ".jpeg",
        url: `https://${process.env.AVATAR_BUCKET}.s3.us-east-2.amazonaws.com/${
          file.filename + "." + ".jpeg"
        }`,
      })
    );
  }
}
