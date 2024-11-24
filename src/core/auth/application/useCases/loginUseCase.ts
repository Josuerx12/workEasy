import { UseCase } from "@src/core/shared/useCase/useCase";
import { UserOutputMapper } from "@src/core/user/application/shared/user.output";
import { UserEntity } from "@src/core/user/domain/entities/user.entity";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { IAuthRepository } from "../../domain/contracts/authRepository.interface";
import { AuthOutput } from "../shared/auth.output";

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

    const userOutput = UserOutputMapper.toOutput(user);

    const token = sign({ user: userOutput }, process.env.SECRET);

    return { token, user: userOutput };
  }
}
