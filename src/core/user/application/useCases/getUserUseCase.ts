import { UseCase } from "@src/core/shared/useCase/useCase";
import { IUserRepository } from "../../domain/contracts/userRepository.interface";
import { UserOutput, UserOutputMapper } from "../shared/user.output";

export type input = {
  id: string;
};

export class GetUserUseCase implements UseCase<input, UserOutput> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: input): Promise<UserOutput> {
    const entity = await this.userRepository.getById(input.id);

    return UserOutputMapper.toOutput(entity);
  }
}
