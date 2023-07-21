import FindQueryDTO from './FindQueryDTO';
import { PaginationQueryDTOParams } from './PaginationQueryDTOParams';

export default class PaginationQueryDTO<T=object> extends FindQueryDTO<T> {
  private _pageNumber: number;
  private _size: number;

  constructor(params?: PaginationQueryDTOParams<T>) {
    super({ order: params.order, criteria: params.criteria });
    console.log('PaginationQueryDTO', params.pageNumber, params.size, params.order, params.criteria);
    this._pageNumber = Number(params.pageNumber);
    this._size = Number(params.size);
  }

  get pageNumber(): number {
    return this._pageNumber;
  }

  get size(): number {
    return this._size;
  }
}