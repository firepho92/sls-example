import 'reflect-metadata';
import Handler from './Handler';
import Mapper from '../domain/mapper/Mapper';
import { injectable } from 'inversify';
import APIGatewayResult from '../domain/dto/APIGatewayResult';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';

@injectable()
export default abstract class APIGatewayProxyEventBaseHandler<T> implements Handler<APIGatewayResult<T>> {
  constructor(
    protected apiGatewayResultMapperService: Mapper<T, APIGatewayResult<T>>
  ){}

  protected abstract run(port?: APIGatewayProxyEvent): Promise<T>;

  async execute(port?: APIGatewayProxyEvent): Promise<APIGatewayResult<T>> {
    const entityDto: T = await this.run(port);
    const response = this.apiGatewayResultMapperService.execute(entityDto);
    return response;
  }
}