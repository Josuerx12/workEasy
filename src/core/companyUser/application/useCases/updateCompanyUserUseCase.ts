import { UseCase } from "src/core/shared/useCase/useCase";
import { ICompanyUserRepository } from "../../domain/contracts/companyUserRepository.interface";
import {
  CompanyUserOutput,
  CompanyUserOutputMapper,
} from "../shared/companyUser.output";
import { CompanyUserEntity } from "../../domain/entities/companyUser.entity";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { AvatarEntity } from "src/core/avatar/domain/entities/avatar.entity";
import s3 from "src/infra/s3Client";
import sharp from "sharp";

export type UpdateCompanyUserInput = {
  id: string;
  name?: string;
  documentType?: string;
  document?: string;
  email?: string;
  phone?: string;
  lat?: string;
  long?: string;
  file?: Express.Multer.File;
  password?: string;
};

export class UpdateCompanyUserUseCase
  implements UseCase<UpdateCompanyUserInput, CompanyUserOutput>
{
  constructor(private readonly companyUserRepository: ICompanyUserRepository) {}

  async execute(input: UpdateCompanyUserInput): Promise<CompanyUserOutput> {
    await this.verifyExistingMailOrDocument(input.email, input.document);

    const companyUserEntity =
      await this.companyUserRepository.getCompanyUserByDocumentEmailOrId(
        input.id
      );

    input.name && companyUserEntity.changeName(input.name);
    input.document && companyUserEntity.changeDocument(input.document);
    input.documentType &&
      companyUserEntity.changeDocumentType(input.documentType);
    input.email && companyUserEntity.changeEmail(input.email);
    input.phone && companyUserEntity.changePhone(input.phone);
    input.password && companyUserEntity.changePassword(input.password);
    input.lat && companyUserEntity.changeLat(input.lat);
    input.long && companyUserEntity.changeLong(input.long);

    input.file && this.uploadAndUpdateAvatar(companyUserEntity, input.file);

    await this.companyUserRepository.update(companyUserEntity);

    return CompanyUserOutputMapper.toOutput(companyUserEntity);
  }

  private async verifyExistingMailOrDocument(
    email?: string,
    document?: string
  ) {
    if (email) {
      const companyUserEmail =
        await this.companyUserRepository.getCompanyUserByDocumentEmailOrId(
          email
        );

      if (companyUserEmail) {
        throw new Error("Empresa com e-mail informado já cadastrado!");
      }
    }

    if (document) {
      const companyUserDocument =
        await this.companyUserRepository.getCompanyUserByDocumentEmailOrId(
          document
        );

      if (companyUserDocument) {
        throw new Error("Empresa com documento informado já cadastrado!");
      }
    }
  }

  private async uploadAndUpdateAvatar(
    companyUser: CompanyUserEntity,
    file: Express.Multer.File
  ) {
    if (companyUser.avatar) {
      const s3DeleteObjectCommand = new DeleteObjectCommand({
        Bucket: process.env.AVATAR_BUCKET,
        Key: companyUser.avatar.path,
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

    companyUser.addAvatar(
      new AvatarEntity({
        path: file.filename + "." + ".jpeg",
        url: `https://${process.env.AVATAR_BUCKET}.s3.us-east-2.amazonaws.com/${
          file.filename + "." + ".jpeg"
        }`,
      })
    );
  }
}
