import Handler from './Handler';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';

export default abstract class BaseHandler<T> implements Handler<T> {
  protected abstract buildExecution(port?: APIGatewayProxyEvent): Promise<T>;

  async execute(port?: APIGatewayProxyEvent): Promise<T> {
    return await this.buildExecution(port);
  }
}