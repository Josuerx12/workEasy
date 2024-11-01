import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { AvatarEntity } from "@src/core/avatar/domain/entities/avatar.entity";
import s3 from "@src/infra/s3Client";
import sharp from "sharp";
import { IUserRepository } from "../../domain/contracts/userRepository.interface";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserOutputMapper } from "../shared/user.output";

export type UserInput = {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  admin?: boolean;
  moderator?: boolean;
  support?: boolean;
  file?: Express.Multer.File;
};

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: UserInput) {
    const userEntity = await this.userRepository.getById(input.id);

    await this.updateEmail(userEntity, input.email);

    if (input.name) {
      userEntity.changeName(input.name);
    }

    if (input.password) {
      userEntity.changePassword(input.password);
    }

    if (input.support != undefined) {
      userEntity.changeSupport(input.support);
    }

    if (input.admin != undefined) {
      userEntity.changeAdmin(input.admin);
    }

    if (input.moderator != undefined) {
      userEntity.changeModerator(input.moderator);
    }

    if (input.file) {
      this.uploadAndUpdateAvatar(userEntity, input.file);
    }

    await this.userRepository.update(userEntity);

    return UserOutputMapper.toOutput(userEntity);
  }

  private async updateEmail(userEntity: UserEntity, newEmail: string) {
    if (userEntity.email === newEmail) {
      return;
    }

    if (newEmail) {
      const userByEmail = await this.userRepository.getByEmail(newEmail);

      if (userByEmail) {
        throw new Error("Email: " + newEmail + ", já cadastrado!");
      }

      userEntity.changeEmail(newEmail);

      return;
    }
  }

  private async uploadAndUpdateAvatar(
    user: UserEntity,
    file: Express.Multer.File
  ) {
    if (user.avatar) {
      const s3DeleteObjectCommand = new DeleteObjectCommand({
        Bucket: process.env.AVATAR_BUCKET,
        Key: user.avatar.path,
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

    user.addAvatar(
      new AvatarEntity({
        path: file.filename + "." + ".jpeg",
        url: `https://${process.env.AVATAR_BUCKET}.s3.us-east-2.amazonaws.com/${
          file.filename + "." + ".jpeg"
        }`,
      })
    );
  }
}
