import { UseCase } from "src/core/shared/useCase/useCase";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { AvatarEntity } from "src/core/avatar/domain/entities/avatar.entity";
import s3 from "src/infra/s3Client";
import { ICompanyRequesterRepository } from "../../domain/contracts/companyRequesterRepository.interface";
import { CompanyRequesterEntity } from "../../domain/entities/companyRequester.entity";
import {
  CompanyRequesterOutput,
  CompanyRequesterOutputMapper,
} from "../shared/companyRequester.output";
import sharp from "sharp";

export type UpdateCompanyRequesterInput = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  file?: Express.Multer.File;
  password?: string;
};

export class UpdateCompanyRequesterUseCase
  implements UseCase<UpdateCompanyRequesterInput, CompanyRequesterOutput>
{
  constructor(
    private readonly companyRequesterRepository: ICompanyRequesterRepository
  ) {}

  async execute(
    input: UpdateCompanyRequesterInput
  ): Promise<CompanyRequesterOutput> {
    await this.verifyExistingMail(input.email);

    const companyRequesterEntity =
      await this.companyRequesterRepository.getCompanyRequesterByEmailOrId(
        input.id
      );

    input.name && companyRequesterEntity.changeName(input.name);
    input.email && companyRequesterEntity.changeEmail(input.email);
    input.phone && companyRequesterEntity.changePhone(input.phone);
    input.password && companyRequesterEntity.changePassword(input.password);

    input.file &&
      this.uploadAndUpdateAvatar(companyRequesterEntity, input.file);

    await this.companyRequesterRepository.update(companyRequesterEntity);

    return CompanyRequesterOutputMapper.toOutput(companyRequesterEntity);
  }

  private async verifyExistingMail(email?: string) {
    if (email) {
      const companyRequesterEmail =
        await this.companyRequesterRepository.getCompanyRequesterByEmailOrId(
          email
        );

      if (companyRequesterEmail) {
        throw new Error("Empresa com e-mail informado já cadastrado!");
      }
    }
  }

  private async uploadAndUpdateAvatar(
    companyRequester: CompanyRequesterEntity,
    file: Express.Multer.File
  ) {
    if (companyRequester.avatar) {
      const s3DeleteObjectCommand = new DeleteObjectCommand({
        Bucket: process.env.AVATAR_BUCKET,
        Key: companyRequester.avatar.path,
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

    companyRequester.addAvatar(
      new AvatarEntity({
        path: file.filename + "." + ".jpeg",
        url: `https://${process.env.AVATAR_BUCKET}.s3.us-east-2.amazonaws.com/${
          file.filename + "." + ".jpeg"
        }`,
      })
    );
  }
}
