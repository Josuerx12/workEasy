import {
  UserOutput,
  UserOutputMapper,
} from "@src/core/user/application/shared/user.output";

export type AuthOutput = {
  token: string;
  user?: UserOutput;
};

export class AuthOutputMapper {
  static toOutput(data: any): AuthOutput {
    return {
      token: data.token,
      user: data.user ? UserOutputMapper.toOutput(data.user) : null,
    };
  }
}
