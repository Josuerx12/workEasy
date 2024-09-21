import { z } from "zod";

export type RoleEntityValidatorProps = {
  name?: string;
  description?: string;
};

export class RoleEntityValidator {
  name?: string;
  description?: string;

  constructor(props: RoleEntityValidatorProps) {
    Object.assign(this, props);
  }

  validate() {
    const roleSchema = z.object({
      name: z.string({ message: "Nome da role deve ser informado!" }),
      description: z.string({
        message: "Descrição da role deve ser informado!",
      }),
    });

    const roleValidated = roleSchema.safeParse(this);

    if (roleValidated.error) {
      throw roleValidated.error;
    }
    return true;
  }
}
