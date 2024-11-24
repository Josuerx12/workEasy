import validator from "validator";
import { z } from "zod";

export type CompanyCustomerValidatorProps = {
  name?: string;
  phone?: string;
  email?: string;
};

export class CompanyCustomerValidator {
  name?: string;
  phone?: string;
  email?: string;

  constructor(props: CompanyCustomerValidatorProps) {
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
      phone: z.string().refine(validator.isMobilePhone).optional(),
    });

    const userValidated = userSchema.safeParse(this);

    if (userValidated.error) {
      throw userValidated.error;
    }
    return true;
  }
}
