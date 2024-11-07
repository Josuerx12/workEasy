export class InputParams<TFilter> {
  readonly perPage: number;
  readonly page: number;
  readonly filter?: TFilter;

  constructor(props: any) {
    this.perPage = props.perPage ? Number(props.perPage) : 10;
    this.page = props.page ? Number(props.page) : 1;
    this.filter = props.filter;
  }
}
