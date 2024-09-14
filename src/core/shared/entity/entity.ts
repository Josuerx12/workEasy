export abstract class Entity {
  abstract toJSON(): any;
  abstract validate(): any;
}
