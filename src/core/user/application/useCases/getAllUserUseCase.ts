import { UseCase } from "src/core/shared/useCase/useCase";
import { UserOutput, UserOutputMapper } from "../shared/user.output";
import { IUserRepository } from "../../domain/contracts/userRepository.interface";

export type input = {
  page?: number;
  perPage?: number;
  filter?: string;
};

export class GetAllUsersUseCase implements UseCase<input, UserOutput[]> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: input): Promise<UserOutput[]> {
    const entities = await this.userRepository.getAll();

    return entities
      ? entities.map((entity) => UserOutputMapper.toOutput(entity))
      : null;
  }
}
