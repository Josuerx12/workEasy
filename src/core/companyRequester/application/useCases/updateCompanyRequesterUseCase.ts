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
    const companyRequesterEntity =
      await this.companyRequesterRepository.getCompanyRequesterByEmailOrId(
        input.id
      );

    await this.companyRequesterRepository.update(companyRequesterEntity);

    return CompanyRequesterOutputMapper.toOutput(companyRequesterEntity);
  }
}
