export default interface PaginationQueryDTO<T> {
  criteria?: T;
  pageNumber: number;
  size: number;
}