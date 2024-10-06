import { z } from "zod";

export type TaskEntityValidatorProps = {
  title?: string;
  status?: string;
  description?: string;
};

export class TaskEntityValidator {
  title?: string;
  status?: string;
  description?: string;

  constructor(props: TaskEntityValidatorProps) {
    Object.assign(this, props);
  }

  validate() {
    const taskSchema = z.object({
      title: z
        .string({ message: "Titulo da tarefa deve ser informado!" })
        .min(3, "Titulo da tarefa deve conter no minimo 3 caracteres")
        .optional(),
      status: z
        .enum(["incoming", "started", "paused", "finished", "canceled"], {
          message:
            "Status deve ser um dos à seguir: ('incoming', 'started', 'paused', 'finished', 'canceled')!",
        })
        .optional(),
      description: z
        .string()
        .min(10, {
          message: "Descrição deve ter um texto com pelo menos 10 caracteres.",
        })
        .optional(),
    });

    const taskValidated = taskSchema.safeParse(this);

    if (taskValidated.error) {
      throw taskValidated.error;
    }
    return true;
  }
}
