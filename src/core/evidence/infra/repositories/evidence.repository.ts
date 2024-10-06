import { db } from "src/infra/dbConn";
import { IEvidenceRepository } from "../../domain/contracts/evidenceRepository.interface";
import { EvidenceEntity } from "../../domain/entities/evidence.entity";
import { EvidenceModelMapper } from "../models/evidence.model.mapper";

export class EvidenceRepository implements IEvidenceRepository {
  async getById(id: string): Promise<EvidenceEntity> {
    const evidence = await db.evidence.findUnique({ where: { id } });

    return evidence ? EvidenceModelMapper.toEntity(evidence) : null;
  }

  async getAll(): Promise<EvidenceEntity[]> {
    const evidences = await db.evidence.findMany();

    return evidences
      ? evidences.map((evidence) => EvidenceModelMapper.toEntity(evidence))
      : null;
  }

  async insert(entity: EvidenceEntity): Promise<void> {
    await db.evidence.create({
      data: EvidenceModelMapper.toModel(entity),
    });

    return;
  }

  async update(entity: EvidenceEntity): Promise<void> {
    await db.evidence.update({
      where: { id: entity.id.value },
      data: EvidenceModelMapper.toModel(entity),
    });

    return;
  }

  async delete(id: string): Promise<void> {
    await db.evidence.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
