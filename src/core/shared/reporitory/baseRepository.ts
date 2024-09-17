export interface BaseRepository<EntityT> {
  getById(id: string): Promise<EntityT>;
  getAll(): Promise<EntityT[]>;
  insert(entity: EntityT): Promise<void>;
  update(entity: EntityT): Promise<void>;
  delete(id: string): Promise<void>;
}
