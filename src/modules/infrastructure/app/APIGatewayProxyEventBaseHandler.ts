import 'reflect-metadata';
import Handler from './Handler';
import { injectable } from 'inversify';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';

@injectable()
export default abstract class APIGatewayProxyEventBaseHandler<T = object> implements Handler<T> {
  protected abstract buildExecution(port?: APIGatewayProxyEvent): T;

  async execute(port?: APIGatewayProxyEvent): Promise<T> {
    return await this.buildExecution(port);
  }
}