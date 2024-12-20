export interface BaseRepository<EntityT, InputParamsT, OutputParamsT> {
  getById(id: string): Promise<EntityT>;
  getAll(props: InputParamsT, companyId?: string): Promise<OutputParamsT>;
  insert(entity: EntityT): Promise<void>;
  update(entity: EntityT): Promise<void>;
  delete(id: string): Promise<void>;
}
