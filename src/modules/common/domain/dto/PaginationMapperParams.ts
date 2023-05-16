export default interface PaginationMapperParams<T> {
  pageNumber: number,
  size: number,
  total: number,
  items: T  
}