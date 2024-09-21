import s3 from "src/infra/s3Client";
import { IUserRepository } from "../../domain/contracts/userRepository.interface";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserOutputMapper } from "../shared/user.output";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { AvatarEntity } from "src/core/avatar/domain/entities/avatar.entity";

export type UserInput = {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
  moderator?: boolean;
  support?: boolean;
  file?: Express.Multer.File;
};

export class StoreUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(input: UserInput) {
    const userByEmail = await this.userRepository.getByEmail(input.email);
    if (userByEmail) {
      throw new Error("Usuário com email: " + input.email + ", já cadastrado!");
    }

    const user = new UserEntity(input);

    input.file && this.uploadAvatar(user, input.file);

    await this.userRepository.insert(user);

    return UserOutputMapper.toOutput(user);
  }

  private async uploadAvatar(
    userEntity: UserEntity,
    file: Express.Multer.File
  ) {
    const s3Command = new PutObjectCommand({
      Key: file.filename + "." + file.mimetype.split("/")[1],
      Bucket: process.env.AVATAR_BUCKET,
      Body: file.buffer,
    });

    await s3.send(s3Command);

    userEntity.addAvatar(
      new AvatarEntity({
        path: file.filename + "." + file.mimetype.split("/")[1],
        url: `https://${process.env.AVATAR_BUCKET}.s3.us-east-2.amazonaws.com/${
          file.filename + "." + file.mimetype.split("/")[1]
        }`,
      })
    );
  }
}
