import BaseMapper from "./BaseMapper";
import HttpStatusCode from "src/utils/enums/httpStatusCode";

interface APIGatewayResult<T> {
  statusCode: HttpStatusCode;
  data: T
}

export default class APIGatewayResultMapperService<T> extends BaseMapper<T, APIGatewayResult<T>> {
  protected transform(data: T, statusCode = HttpStatusCode.OK): APIGatewayResult<T> {
    return {
      statusCode: statusCode,
      data
    }
  }
}