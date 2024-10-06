import { UseCase } from "src/core/shared/useCase/useCase";
import { CompanyOutput, CompanyOutputMapper } from "../shared/company.output";
import { ICompanyRepository } from "../../domain/contracts/companyRepository.interface";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { AvatarEntity } from "src/core/avatar/domain/entities/avatar.entity";
import s3 from "src/infra/s3Client";
import { CompanyEntity } from "../../domain/entities/company.entity";
import sharp from "sharp";

export type UpdateCompanyInput = {
  id: string;
  name?: string;
  documentType?: string;
  document?: string;
  email?: string;
  phone?: string;
  password?: string;
  file?: Express.Multer.File;
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

    input.file && this.uploadAndUpdateAvatar(companyEntity, input.file);

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
