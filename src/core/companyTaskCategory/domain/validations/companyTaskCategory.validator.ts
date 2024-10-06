import { z } from "zod";

export type CompanyTaskCategoryValidatorProps = {
  companyId: string;
  title: string;
  description: string;
};

export class CompanyTaskCategoryValidator {
  title: string;
  description: string;
  companyId: string;

  constructor(props: CompanyTaskCategoryValidatorProps) {
    Object.assign(this, props);
  }

  validate() {
    const companyTaskCategorySchema = z.object({
      title: z
        .string({ message: "Titulo deve ser informado!" })
        .min(3, "Titulo deve conter no minimo 3 caracteres"),
      description: z
        .string({ message: "Descrição deve ser informada!" })
        .length(10, {
          message: "Descrição deve conter no minimo 10 caracteres.",
        }),
      companyId: z.string().uuid("Company id deve ser um id válido!"),
    });

    const companyTaskCategoryValidated =
      companyTaskCategorySchema.safeParse(this);

    if (companyTaskCategoryValidated.error) {
      throw companyTaskCategoryValidated.error;
    }
    return true;
  }
}
