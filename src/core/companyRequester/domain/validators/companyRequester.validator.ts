import { z } from "zod";
import validator from "validator";

export type CompanyRequesterEntityValidatorProps = {
  name?: string;
  password?: string;
  email?: string;
  phone?: string;
};

export class CompanyRequesterEntityValidator {
  name?: string;
  password?: string;
  email?: string;
  phone?: string;

  constructor(props: CompanyRequesterEntityValidatorProps) {
    Object.assign(this, props);
  }

  validate() {
    const companyRequesterSchema = z.object({
      name: z
        .string({ message: "Nome deve ser informado!" })
        .min(3, "Nome deve conter no minimo 3 caracteres")
        .optional(),
      email: z
        .string({ message: "Email deve ser informado!" })
        .email({ message: "Email deve ser valido." })
        .optional(),
      phone: z.string().refine(validator.isMobilePhone).optional(),
      password: z
        .string({ message: "Senha é obrigatoria e deve ser informada!" })
        .min(8, "Senha deve conter no minimo 8 caracteres")
        .optional(),
    });

    const companyRequesterValidated = companyRequesterSchema.safeParse(this);

    if (companyRequesterValidated.error) {
      throw companyRequesterValidated.error;
    }
    return true;
  }
}
