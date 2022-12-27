import PaginationMapperParams from "../dto/PaginationMapperParams";
import PaginationResponseDTO from "../dto/PaginationResponseDTO";
import MapperService from "./BaseMapper";

export default class PaginationMapperService<T> extends MapperService<PaginationMapperParams<T>, PaginationResponseDTO<T>> {
  protected map(port: PaginationMapperParams<T>): PaginationResponseDTO<T> {
    return {
      currentPage: port.pageNumber,
      from: (port.pageNumber - 1) * port.size + 1,
      to: (port.pageNumber - 1) * port.size + Number(port.size),
      perPage: port.size,
      lastPage: Math.ceil(port.total / port.size),
      total: port.total,
      items: port.items
    }
  }
}