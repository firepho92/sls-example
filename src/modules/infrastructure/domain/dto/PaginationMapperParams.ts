export default class PaginationMapperParams<T> {
  _pageNumber: number;
  _size: number;
  _total: number;
  _items: T;

  constructor(pageNumber: number, size: number, total: number, items: T) {
    this._pageNumber = pageNumber;
    this._size = size;
    this._total = total;
    this._items = items;
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

  get total(): number {
    return this._total;
  }

  set total(total: number) {
    this._total = total;
  }

  get items(): T {
    return this._items;
  }
}