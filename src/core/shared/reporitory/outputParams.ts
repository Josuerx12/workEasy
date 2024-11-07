import { Entity } from "../entity/entity";

export type OutputParamsConstructorProps<TEntity extends Entity> = {
  items: TEntity[];
  total: number;
  currentPage: number;
  perPage: number;
};

export class OutputParams<TEntity extends Entity = Entity> {
  readonly items: TEntity[];
  readonly total: number;
  readonly currentPage: number;
  readonly perPage: number;
  readonly lastPage: number;

  constructor(props: OutputParamsConstructorProps<TEntity>) {
    this.items = props.items;
    this.total = props.total;
    this.currentPage = props.currentPage;
    this.perPage = props.perPage;
    this.lastPage = Math.ceil(this.total / this.perPage);
  }

  toJSON(forceAggregate = false) {
    return {
      items: forceAggregate
        ? this.items.map((item) => item.toJSON())
        : this.items,
      total: this.total,
      currentPage: this.currentPage,
      perPage: this.perPage,
      lastPage: this.lastPage,
    };
  }
}
