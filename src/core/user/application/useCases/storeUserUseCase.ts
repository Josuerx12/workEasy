import { IUserRepository } from "../../domain/contracts/userRepository.interface";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserOutputMapper } from "../shared/user.output";

export type UserInput = {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
  moderator?: boolean;
  support?: boolean;
};

export class StoreUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: UserInput) {
    const userByEmail = await this.userRepository.getByEmail(input.email);

    if (userByEmail) {
      throw new Error("Usuário com email: " + input.email + ", já cadastrado!");
    }

    const user = new UserEntity(input);

    await this.userRepository.insert(user);

    return UserOutputMapper.toOutput(user);
  }
}
