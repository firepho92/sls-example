import Order from "./Order";

export default class PaginationQueryDTO<T=object> {
  private _criteria?: T;
  private _order?: Order;
  private _pageNumber: number;
  private _size: number;

  constructor(pageNumber: number, size: number, order?: Order, criteria?: T) {
    this._pageNumber = pageNumber ?? 1;
    this._size = size ?? 10;
    this._criteria = criteria;
    this._order = order;
  }

  get criteria(): T | undefined {
    return this._criteria;
  }

  set criteria(criteria: T) {
    this._criteria = criteria;
  }

  get order(): Order | undefined {
    return this._order;
  }

  set order(order: Order) {
    this._order = order;
  }

  get pageNumber(): number {
    return this._pageNumber;
  }

  set pageNumber(pageNumber: number) {
    this._pageNumber = pageNumber;
  }

  get size(): number {
    return this._size;
  }

  set size(size: number) {
    this._size = size;
  }
}