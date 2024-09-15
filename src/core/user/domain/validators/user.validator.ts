import { z } from "zod";

export type UserEntityValidatorProps = {
  name?: string;
  password?: string;
  email?: string;
};

export class UserEntityValidator {
  name?: string;
  password?: string;
  email?: string;

  constructor(props: UserEntityValidatorProps) {
    Object.assign(this, props);
  }

  validate() {
    const userSchema = z.object({
      name: z
        .string({ message: "Nome deve ser informado!" })
        .min(3, "Nome deve conter no minimo 3 caracteres")
        .optional(),
      email: z
        .string({ message: "Email deve ser informado!" })
        .email({ message: "Email deve ser valido." })
        .optional(),
      password: z
        .string({ message: "Senha é obrigatoria e deve ser informada!" })
        .min(8, "Senha deve conter no minimo 8 caracteres")
        .optional(),
    });

    const userValidated = userSchema.safeParse(this);

    if (userValidated.error) {
      throw userValidated.error;
    }
    return true;
  }
}
