import { UseCase } from "src/core/shared/useCase/useCase";
import { AuthOutput } from "../shared/auth.output";
import { IAuthRepository } from "../../domain/contracts/authRepository.interface";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UserEntity } from "src/core/user/domain/entities/user.entity";
import { UserOutputMapper } from "src/core/user/application/shared/user.output";

export type LoginInput = {
  email: string;
  password: string;
};

export class LoginUseCase implements UseCase<LoginInput, AuthOutput> {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(input: LoginInput): Promise<AuthOutput> {
    const user = await this.authRepository.getUserByEmail(input.email);

    const verifiedUser = await compare(input.password, user.password);

    if (!verifiedUser) {
      throw new Error("Dados incorretos, tente novamente!");
    }

    const userEntity = new UserEntity({
      id: user.id,
      email: user.email,
      name: user.name,
      moderator: user.moderator,
      support: user.support,
      admin: user.admin,
    });

    const userOutput = UserOutputMapper.toOutput(userEntity);

    const token = sign({ user: userOutput }, process.env.SECRET);

    return { token, user: userOutput };
  }
}
