import { AvatarEntity } from "../../domain/entities/avatar.entity";

export type AvatarOutput = {
  id: string;
  path: string;
  url: string;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class AvatarOutputMapper {
  static toOutput(avatarEntity: AvatarEntity): AvatarOutput {
    return avatarEntity ? avatarEntity.toJSON() : null;
  }
}
