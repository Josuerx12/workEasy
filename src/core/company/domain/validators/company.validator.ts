import { z } from "zod";
import validator from "validator";

export type CompanyEntityValidatorProps = {
  name?: string;
  password?: string;
  email?: string;
  phone?: string;
  document?: string;
  documentType?: string;
};

export class CompanyEntityValidator {
  name?: string;
  password?: string;
  email?: string;
  phone?: string;
  document?: string;
  documentType?: string;

  constructor(props: CompanyEntityValidatorProps) {
    Object.assign(this, props);
  }

  validate() {
    const companySchema = z.object({
      name: z
        .string({ message: "Nome deve ser informado!" })
        .min(3, "Nome deve conter no minimo 3 caracteres")
        .optional(),
      email: z
        .string({ message: "Email deve ser informado!" })
        .email({ message: "Email deve ser valido." })
        .optional(),
      phone: z.string().refine(validator.isMobilePhone).optional(),
      document: z
        .string()
        .refine(
          (document) => {
            const regex =
              /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;

            if (regex.test(document)) {
              return true;
            }
            return false;
          },
          { message: "Documento deve ser um cpf ou cnpj valido" }
        )
        .optional(),
      documentType: z
        .string()
        .refine(
          (value) => {
            if (value.includes("cpf") || value.includes("cnpj")) {
              return true;
            }
            return false;
          },
          { message: "Tipo do documento deve ser cpf ou cnpj." }
        )
        .optional(),
      password: z
        .string({ message: "Senha é obrigatoria e deve ser informada!" })
        .min(8, "Senha deve conter no minimo 8 caracteres")
        .optional(),
    });

    const companyValidated = companySchema.safeParse(this);

    if (companyValidated.error) {
      throw companyValidated.error;
    }
    return true;
  }
}
