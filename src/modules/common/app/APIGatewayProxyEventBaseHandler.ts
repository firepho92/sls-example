import Handler from './Handler';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';

export default abstract class APIGatewayProxyEventBaseHandler<T = object> implements Handler<T> {
  protected abstract buildExecution(port?: APIGatewayProxyEvent): T;

  async execute(port?: APIGatewayProxyEvent): Promise<T> {
    return await this.buildExecution(port);
  }
}