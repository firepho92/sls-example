import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy";

export default interface Handler<T = object, U = object> {
  execute(port?: T): Promise<U>
}