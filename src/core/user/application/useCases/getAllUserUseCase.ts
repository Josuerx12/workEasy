import { UseCase } from "@src/core/shared/useCase/useCase";
import {
  IUserRepository,
  UserInputParams,
} from "../../domain/contracts/userRepository.interface";
import { UserOutput, UserOutputMapper } from "../shared/user.output";
import {
  PaginationOutput,
  PaginationOutputMapper,
} from "@src/core/shared/paginationOutput";

export type input = {
  page?: number;
  perPage?: number;
  filter?: string;
};

export class GetAllUsersUseCase
  implements UseCase<input, PaginationOutput<UserOutput>>
{
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: input): Promise<PaginationOutput<UserOutput>> {
    const index = await this.userRepository.getAll(new UserInputParams(input));

    const items = index.items.map((entity) =>
      UserOutputMapper.toOutput(entity)
    );

    return PaginationOutputMapper.toOutput(items, index);
  }
}
