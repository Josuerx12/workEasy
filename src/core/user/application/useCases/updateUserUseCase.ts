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
}
