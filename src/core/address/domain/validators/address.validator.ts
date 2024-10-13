import { z } from "zod";

export type AvatarEntityValidatorProps = {
  name?: string;
  password?: string;
  email?: string;
  phone?: string;
  document?: string;
  documentType?: string;
};

export class AvatarEntityValidator {
  name?: string;
  password?: string;
  email?: string;
  phone?: string;
  document?: string;
  documentType?: string;

  constructor(props: AvatarEntityValidatorProps) {
    Object.assign(this, props);
  }

  validate() {
    const avatarSchema = z.object({
      path: z.string({ message: "Path do avatar deve ser informado!" }),
      url: z.string({ message: "Url do avatar deve ser informado!" }),
    });

    const avatarValidated = avatarSchema.safeParse(this);

    if (avatarValidated.error) {
      throw avatarValidated.error;
    }
    return true;
  }
}
