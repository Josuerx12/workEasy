import { EvidenceEntity } from "../../domain/entities/evidence.entity";

export type EvidenceOutput = {
  id: string;
  taskId: string;
  path: string;
  url: string;
  task: any[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class EvidenceOutputMapper {
  static toOutput(evidenceEntity: EvidenceEntity): EvidenceOutput {
    return evidenceEntity ? evidenceEntity.toJSON() : null;
  }
}
