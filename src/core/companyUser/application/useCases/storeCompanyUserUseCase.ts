import { UseCase } from "src/core/shared/useCase/useCase";
import { ICompanyUserRepository } from "../../domain/contracts/companyUserRepository.interface";
import { CompanyUserEntity } from "../../domain/entities/companyUser.entity";
import {
  CompanyUserOutput,
  CompanyUserOutputMapper,
} from "../shared/companyUser.output";
import { AvatarEntity } from "src/core/avatar/domain/entities/avatar.entity";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "src/infra/s3Client";
import sharp from "sharp";
export type StoreCompanyUserInput = {
  companyId: string;
  name: string;
  documentType: string;
  document: string;
  email: string;
  phone: string;
  password: string;
  lat?: string;
  long?: string;
  file?: Express.Multer.File;
};

export class StoreCompanyUserUseCase
  implements UseCase<StoreCompanyUserInput, CompanyUserOutput>
{
  constructor(private readonly companyUserRepository: ICompanyUserRepository) {}

  async execute(input: StoreCompanyUserInput): Promise<CompanyUserOutput> {
    await this.verifyExistingMailAndDocument(input.email, input.document);

    const companyUser = new CompanyUserEntity(input);

    input.file && this.uploadAvatar(companyUser, input.file);

    await this.companyUserRepository.insert(companyUser);

    return CompanyUserOutputMapper.toOutput(companyUser);
  }

  private async uploadAvatar(
    companyUser: CompanyUserEntity,
    file: Express.Multer.File
  ) {
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

  private async verifyExistingMailAndDocument(email: string, document: string) {
    const companyUserEmail =
      await this.companyUserRepository.getCompanyUserByDocumentEmailOrId(email);
    const companyUserDocument =
      await this.companyUserRepository.getCompanyUserByDocumentEmailOrId(
        document
      );

    if (companyUserEmail) {
      throw new Error("Usuário de empresa com e-mail informado já cadastrado!");
    }

    if (companyUserDocument) {
      throw new Error(
        "Usuário de empresa com documento informado já cadastrado!"
      );
    }
  }
}
