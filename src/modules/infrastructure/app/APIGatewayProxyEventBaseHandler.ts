import 'reflect-metadata';
import Handler from './Handler';
import { injectable } from 'inversify';
import Mapper from '../domain/mapper/Mapper';
import APIGatewayResult from '../domain/dto/APIGatewayResult';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';

@injectable()
export default abstract class APIGatewayProxyEventBaseHandler<T> implements Handler<APIGatewayProxyEvent, APIGatewayResult<T>> {
  constructor(
    protected apiGatewayResultMapperService: Mapper<T, APIGatewayResult<T>>
  ){}

  protected abstract run(port?: APIGatewayProxyEvent): Promise<T>;

  async execute(port?: APIGatewayProxyEvent): Promise<APIGatewayResult<T>> {
    console.log('APIGatewayProxyEventBaseHandler', port);
    const entityDto: T = await this.run(port);
    const response = this.apiGatewayResultMapperService.execute(entityDto);
    return response;
  }
}