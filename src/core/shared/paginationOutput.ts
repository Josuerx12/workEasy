export type PaginationOutput<Item = any> = {
  items: Item[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
};

export class PaginationOutputMapper {
  static toOutput<Item = any>(
    items: Item[],
    props: any
  ): PaginationOutput<Item> {
    return {
      items,
      currentPage: props.currentPage,
      lastPage: props.lastPage,
      perPage: props.perPage,
      total: props.total,
    };
  }
}
