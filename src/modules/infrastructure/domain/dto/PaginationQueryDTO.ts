import Order from "./Order";

export default class PaginationQueryDTO<T=object> {
  private _criteria?: T;
  private _order?: Order;
  private _pageNumber: number;
  private _size: number;

  constructor(pageNumber: number | string = 1, size: number | string = 10, order?: Order, criteria?: T) {
    console.log('PaginationQueryDTO', pageNumber, size, order, criteria);
    this._pageNumber = Number(pageNumber);
    this._size = Number(size);
    this._criteria = criteria;
    this._order = order;
  }

  get criteria(): T | undefined {
    return this._criteria;
  }

  get order(): Order | undefined {
    return this._order;
  }

  get pageNumber(): number {
    return this._pageNumber;
  }

  get size(): number {
    return this._size;
  }
}