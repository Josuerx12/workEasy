import { UseCase } from "src/core/shared/useCase/useCase";
import { AvatarEntity } from "src/core/avatar/domain/entities/avatar.entity";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "src/infra/s3Client";
import { ICompanyRequesterRepository } from "../../domain/contracts/companyRequesterRepository.interface";
import { CompanyRequesterEntity } from "../../domain/entities/companyRequester.entity";
import {
  CompanyRequesterOutput,
  CompanyRequesterOutputMapper,
} from "../shared/companyRequester.output";
import sharp from "sharp";
export type StoreCompanyRequesterInput = {
  companyId: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  file?: Express.Multer.File;
};

export class StoreCompanyRequesterUseCase
  implements UseCase<StoreCompanyRequesterInput, CompanyRequesterOutput>
{
  constructor(
    private readonly companyRequesterRepository: ICompanyRequesterRepository
  ) {}

  async execute(
    input: StoreCompanyRequesterInput
  ): Promise<CompanyRequesterOutput> {
    await this.verifyExistingMail(input.email);

    const companyRequester = new CompanyRequesterEntity(input);

    input.file && this.uploadAvatar(companyRequester, input.file);

    await this.companyRequesterRepository.insert(companyRequester);

    return CompanyRequesterOutputMapper.toOutput(companyRequester);
  }

  private async uploadAvatar(
    companyRequester: CompanyRequesterEntity,
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

    companyRequester.addAvatar(
      new AvatarEntity({
        path: file.filename + "." + ".jpeg",
        url: `https://${process.env.AVATAR_BUCKET}.s3.us-east-2.amazonaws.com/${
          file.filename + "." + ".jpeg"
        }`,
      })
    );
  }

  private async verifyExistingMail(email: string) {
    const companyRequesterEmail =
      await this.companyRequesterRepository.getCompanyRequesterByEmailOrId(
        email
      );

    if (companyRequesterEmail) {
      throw new Error("Usuário de empresa com e-mail informado já cadastrado!");
    }
  }
}
