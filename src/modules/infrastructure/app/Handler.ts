import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy";

export default interface Handler<T = object> {
  execute(port?: APIGatewayProxyEvent): Promise<T>
}